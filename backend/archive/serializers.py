import datetime
from rest_framework import serializers
from django.contrib.auth.models import User
from archive.models import Category, Post, ActivityLog, Campaign, CampaignDay


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False, allow_null=True)
    date = serializers.DateField(required=False, default=datetime.date.today)

    class Meta:
        model = Post
        fields = [
            'id',
            'slug',
            'custom_slug',
            'seo_keywords',
            'title',
            'description',
            'source_link',
            'image',
            'video_url',
            'show_video',
            'location_text',
            'date',
            'division',
            'author_name',
            'category',
            'category_name',
            'is_sensitive_image',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['slug']


    def create(self, validated_data):
        category = validated_data.get('category')
        if not category:
            category, _ = Category.objects.get_or_create(name='অন্যান্য')
            validated_data['category'] = category
            
        date = validated_data.get('date')
        if not date:
            validated_data['date'] = datetime.date.today()
            
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'category' in validated_data and not validated_data['category']:
            category, _ = Category.objects.get_or_create(name='অন্যান্য')
            validated_data['category'] = category
            
        date = validated_data.get('date')
        if 'date' in validated_data and not date:
            validated_data['date'] = datetime.date.today()
            
        return super().update(instance, validated_data)


class SubmitPostSerializer(serializers.ModelSerializer):
    """Serializer for public post submissions (limited fields)."""
    description = serializers.CharField(required=False, allow_blank=True, default='')
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Post
        fields = [
            'title',
            'description',
            'source_link',
            'image',
            'location_text',
            'category',
        ]
        extra_kwargs = {
            'source_link': {'required': False, 'allow_blank': True},
            'image': {'required': False},
            'location_text': {'required': False, 'allow_blank': True},
        }


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class RegisterModeratorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            is_staff=True,  # Staff flag so they can post news
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_superuser', 'is_staff', 'role', 'date_joined']

    def get_role(self, obj):
        if obj.is_superuser:
            return 'Super Admin'
        elif obj.is_staff:
            return 'Moderator'
        return 'User'


class ActivityLogSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True, default='System')
    action_display = serializers.CharField(source='get_action_display', read_only=True)

    class Meta:
        model = ActivityLog
        fields = ['id', 'username', 'action', 'action_display', 'target_label', 'details', 'created_at']


class CampaignDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignDay
        fields = '__all__'


class CampaignSerializer(serializers.ModelSerializer):
    days = CampaignDaySerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = '__all__'
