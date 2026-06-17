"""
URL configuration for core project.
"""
import os
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from archive.views import (
    PostViewSet, CategoryViewSet, SubmitPostView, UserReportListView, UserReportDetailView,
    LoginView, RegisterModeratorView, ModeratorsListView, DashboardStatsView,
    PublicStatsView, DeleteModeratorView, ActivityLogView,
)
from archive.feeds import LatestPostsFeed

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'submit', SubmitPostView, basename='submit')

admin_url_path = os.environ.get("ADMIN_URL_PATH", "admin").strip().strip("/")

urlpatterns = [
    path(f'{admin_url_path}/', admin.site.urls),
    path('api/', include(router.urls)),
    # Auth endpoints
    path('api/auth/login/', LoginView.as_view(), name='auth-login'),
    path('api/auth/register-moderator/', RegisterModeratorView.as_view(), name='auth-register-moderator'),
    path('api/auth/moderators/', ModeratorsListView.as_view(), name='auth-moderators'),
    path('api/auth/moderators/<int:pk>/', DeleteModeratorView.as_view(), name='auth-delete-moderator'),
    path('api/user-reports/', UserReportListView.as_view(), name='user-reports'),
    path('api/user-reports/<int:pk>/', UserReportDetailView.as_view(), name='user-report-detail'),
    # Dashboard stats
    path('api/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('api/public-stats/', PublicStatsView.as_view(), name='public-stats'),
    # Activity logs
    path('api/activity-logs/', ActivityLogView.as_view(), name='activity-logs'),
    # Feature 4: RSS feed — latest 50 published posts
    path('api/feed/rss/', LatestPostsFeed(), name='rss-feed'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
