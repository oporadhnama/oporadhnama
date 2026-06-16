import datetime
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters import rest_framework as filters
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from archive.models import Post, Category, ActivityLog
from django.db.models import Count
from archive.serializers import (
    PostSerializer, CategorySerializer, SubmitPostSerializer,
    LoginSerializer, RegisterModeratorSerializer, UserSerializer,
    ActivityLogSerializer,
)


# ─── Helper: create an activity log entry ────────────────────────────────────

def log_activity(user, action, target_label='', details=''):
    """Create an ActivityLog entry."""
    ActivityLog.objects.create(
        user=user,
        action=action,
        target_label=target_label[:300],
        details=details,
    )


# ─── Filters ────────────────────────────────────────────────────────────────

class PostFilter(filters.FilterSet):
    date = filters.DateFilter(field_name='date', lookup_expr='exact')
    date_gte = filters.DateFilter(field_name='date', lookup_expr='gte')
    date_lte = filters.DateFilter(field_name='date', lookup_expr='lte')
    division = filters.CharFilter(field_name='division', lookup_expr='exact')
    category = filters.NumberFilter(field_name='category', lookup_expr='exact')
    search = filters.CharFilter(method='filter_search')

    class Meta:
        model = Post
        fields = ['date', 'division', 'category', 'search']

    def filter_search(self, queryset, name, value):
        from django.db.models import Q
        value = (value or '').strip()
        if not value:
            return queryset
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(location_text__icontains=value)
        ).distinct()


# ─── ViewSets ────────────────────────────────────────────────────────────────

class PostViewSet(viewsets.ModelViewSet):
    """
    Public read access. Authenticated staff/admin write access.
    Logs create/delete/update actions to ActivityLog.
    Supports lookup by slug (e.g. /api/posts/42-dhaka-2026-06-15/) or by
    numeric ID for backward compatibility (e.g. /api/posts/42/).
    """
    queryset = Post.objects.select_related('category').filter(is_user_report=False).order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PostFilter
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_object(self):
        """Support both slug and numeric-ID lookups for backward compatibility."""
        lookup_value = self.kwargs.get(self.lookup_field, '')
        # If the lookup value is purely numeric, treat it as a PK fallback
        if lookup_value.isdigit():
            from django.shortcuts import get_object_or_404
            obj = get_object_or_404(
                self.get_queryset(),
                pk=int(lookup_value),
            )
            self.check_object_permissions(self.request, obj)
            return obj
        return super().get_object()

    def perform_create(self, serializer):
        post = serializer.save()
        log_activity(
            user=self.request.user,
            action='post_created',
            target_label=post.title,
            details=f"Category: {post.category.name}, Division: {post.division}",
        )

    def perform_destroy(self, instance):
        title = instance.title
        log_activity(
            user=self.request.user,
            action='post_deleted',
            target_label=title,
        )
        instance.delete()

    def perform_update(self, serializer):
        post = serializer.save()
        log_activity(
            user=self.request.user,
            action='post_updated',
            target_label=post.title,
        )



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ─── Public submission ───────────────────────────────────────────────────────

class SubmitPostView(viewsets.GenericViewSet):
    """Public endpoint for submitting news tips."""
    serializer_class = SubmitPostSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        category = serializer.validated_data.pop('category', None)
        if not category:
            category, _ = Category.objects.get_or_create(name='অন্যান্য')

        post = serializer.save(
            category=category,
            division='অজানা',
            date=datetime.date.today(),
            is_user_report=True,
        )
        return Response(
            {'message': 'তথ্য সফলভাবে পাঠানো হয়েছে।', 'id': post.id},
            status=status.HTTP_201_CREATED,
        )


class UserReportListView(generics.ListAPIView):
    """GET /api/user-reports/ — returns raw public report submissions for staff/admin users."""
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Post.objects.select_related('category').filter(is_user_report=True).order_by('-created_at')


class UserReportDetailView(generics.RetrieveDestroyAPIView):
    """GET /api/user-reports/<id>/ — return a single user report."""
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Post.objects.select_related('category').filter(is_user_report=True)

    def perform_destroy(self, instance):
        title = instance.title
        log_activity(
            user=self.request.user,
            action='post_deleted',
            target_label=title,
        )
        instance.delete()


# ─── Authentication ──────────────────────────────────────────────────────────

class LoginView(APIView):
    """POST /api/auth/login/ — returns JWT tokens + user info. Logs login."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
        )

        if user is None:
            return Response(
                {'error': 'ভুল ইউজারনেম অথবা পাসওয়ার্ড।'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not (user.is_staff or user.is_superuser):
            return Response(
                {'error': 'আপনার অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই।'},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Log the login
        log_activity(user=user, action='login')

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data,
        })


class RegisterModeratorView(generics.CreateAPIView):
    """POST /api/auth/register-moderator/ — Super Admin only. Logs action."""
    serializer_class = RegisterModeratorSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Log moderator creation
        log_activity(
            user=request.user,
            action='moderator_added',
            target_label=user.username,
            details=f"Email: {user.email or 'N/A'}",
        )

        return Response(
            UserSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )


class DeleteModeratorView(APIView):
    """DELETE /api/auth/moderators/<id>/ — Super Admin only. Logs removal."""
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            mod = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(
                {'error': 'মডারেটর পাওয়া যায়নি।'},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not mod.is_staff:
            return Response(
                {'error': 'এই ব্যবহারকারী মডারেটর নয়।'},
                status=status.HTTP_403_FORBIDDEN,
            )

        username = mod.username
        mod.delete()
        log_activity(
            user=request.user,
            action='moderator_removed',
            target_label=username,
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModeratorsListView(generics.ListAPIView):
    """GET /api/auth/moderators/ — list all moderators for super admins."""
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(is_staff=True).order_by('username')


class DashboardStatsView(APIView):
    """GET /api/stats/ — dashboard statistics for staff/admin."""
    permission_classes = [IsAdminUser]

    def get(self, request):
        stats = {
            'total_posts': Post.objects.filter(is_user_report=False).count(),
            'total_user_reports': Post.objects.filter(is_user_report=True).count(),
            'total_categories': Category.objects.count(),
        }
        return Response(stats)


class PublicStatsView(APIView):
    """GET /api/public-stats/ — public statistics for the frontend."""
    permission_classes = [AllowAny]

    def get(self, request):
        posts_qs = Post.objects.filter(is_user_report=False)

        # Aggregate counts grouped by category name
        agg = posts_qs.values('category__name').annotate(count=Count('id'))
        counts = {}
        for item in agg:
            name = item.get('category__name') or 'অন্যান্য'
            counts[name] = item.get('count', 0)

        # Ensure all categories appear (with zero if no posts)
        for cat in Category.objects.all():
            counts.setdefault(cat.name, 0)

        stats = {
            'total_posts': posts_qs.count(),
            'total_categories': Category.objects.count(),
            'counts': counts,
        }
        # Backwards-compat: also expose top-level category keys for frontend expecting them
        stats.update(counts)

        return Response(stats)


class ActivityLogView(generics.ListAPIView):
    """GET /api/activity-logs/ — activity logs for admins."""
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return ActivityLog.objects.select_related('user').order_by('-created_at')

    def delete(self, request, *args, **kwargs):
        """DELETE /api/activity-logs/ — clears all activity logs (superuser only)."""
        if not request.user.is_superuser:
            return Response(
                {"detail": "শুধুমাত্র সুপার এডমিন অ্যাক্টিভিটি লগ মুছতে পারবেন।"},
                status=status.HTTP_403_FORBIDDEN
            )
        ActivityLog.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

