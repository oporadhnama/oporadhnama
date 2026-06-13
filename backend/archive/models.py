from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    source_link = models.URLField(blank=True, default='')
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    video_url = models.URLField(blank=True, default='', help_text="Facebook or YouTube video link (optional)")
    show_video = models.BooleanField(default=True, help_text="Show video on detail page")
    location_text = models.CharField(max_length=255, blank=True, default='')
    date = models.DateField()
    division = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_user_report = models.BooleanField(default=False, help_text='Mark as a raw user submission from the public report form')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title


class ActivityLog(models.Model):
    """Tracks all moderator and admin actions for the supreme admin dashboard."""

    ACTION_CHOICES = [
        ('post_created', 'সংবাদ তৈরি'),
        ('post_deleted', 'সংবাদ মুছে ফেলা'),
        ('post_updated', 'সংবাদ সম্পাদনা'),
        ('moderator_added', 'মডারেটর যোগ'),
        ('moderator_removed', 'মডারেটর অপসারণ'),
        ('login', 'লগইন'),
    ]

    user = models.ForeignKey(
        'auth.User',
        on_delete=models.SET_NULL,
        null=True,
        related_name='activity_logs',
    )
    action = models.CharField(max_length=30, choices=ACTION_CHOICES)
    target_label = models.CharField(
        max_length=300,
        blank=True,
        default='',
        help_text="E.g. post title or moderator username affected",
    )
    details = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} → {self.get_action_display()} ({self.target_label})"
