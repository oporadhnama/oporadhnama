from django.db import models
from django.utils.text import slugify


# Static map: Bengali division names → ASCII slug segments
DIVISION_SLUG_MAP = {
    'ঢাকা': 'dhaka',
    'চট্টগ্রাম': 'chittagong',
    'রাজশাহী': 'rajshahi',
    'খুলনা': 'khulna',
    'বরিশাল': 'barisal',
    'সিলেট': 'sylhet',
    'রংপুর': 'rangpur',
    'ময়মনসিংহ': 'mymensingh',
    'অজানা': 'unknown',
}


def generate_post_slug(post_id, division, date):
    """Build a URL-safe slug: {id}-{division_ascii}-{YYYY-MM-DD}"""
    div_ascii = DIVISION_SLUG_MAP.get(division, slugify(division) or 'bd')
    date_str = str(date)  # already YYYY-MM-DD
    return f"{post_id}-{div_ascii}-{date_str}"


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
    date = models.DateField(db_index=True)
    division = models.CharField(max_length=100, db_index=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_user_report = models.BooleanField(default=False, help_text='Mark as a raw user submission from the public report form')
    is_sensitive_image = models.BooleanField(default=False, help_text='Mark if the image contains sensitive content (blur effect)')
    created_at = models.DateTimeField(auto_now_add=True)
    # SEO slug — auto-populated on first save; unique across all posts
    slug = models.SlugField(
        max_length=300,
        unique=True,
        blank=True,
        allow_unicode=False,
        help_text="Auto-generated SEO-friendly URL segment. Format: {id}-{division}-{date}",
    )

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # First save: get the PK by saving without slug, then set slug and save again
        if not self.pk:
            super().save(*args, **kwargs)
            self.slug = generate_post_slug(self.pk, self.division, self.date)
            # Use update_fields to avoid recursion
            Post.objects.filter(pk=self.pk).update(slug=self.slug)
        else:
            if not self.slug:
                self.slug = generate_post_slug(self.pk, self.division, self.date)
            super().save(*args, **kwargs)


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
