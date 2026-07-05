import re
import unicodedata
from django.db import models


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
    'আন্তর্জাতিক': 'international',
    'অজানা': 'unknown',
}


def proper_unicode_slugify(text):
    """
    Proper Unicode slugifier that preserves Bengali/non-ASCII alphanumeric chars
    including combining marks (vowels), replaces punctuation/spaces with hyphens,
    and cleans up consecutive hyphens.
    """
    if not text:
        return ""
    text = text.lower()
    text = unicodedata.normalize('NFC', text)
    
    cleaned_chars = []
    for char in text:
        cat = unicodedata.category(char)
        # L = Letter, N = Number, M = Mark (crucial for combining characters/vowels), or spaces/hyphens
        if cat.startswith('L') or cat.startswith('N') or cat.startswith('M') or char in (' ', '-', '_'):
            cleaned_chars.append(char)
        else:
            cleaned_chars.append(' ')
            
    text = "".join(cleaned_chars)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def generate_post_slug(post_instance):
    """
    Build a URL-safe unique slug.
    If post_instance.custom_slug is provided, we use it (properly slugified).
    Otherwise, we generate the default: {id}-{title_slug}-{keywords_slug}-{division_ascii}-{YYYY-MM-DD}
    """
    if post_instance.custom_slug:
        base_slug = proper_unicode_slugify(post_instance.custom_slug)
        if not base_slug:
            base_slug = "custom"
        final_slug = f"{post_instance.pk}-{base_slug}"
    else:
        title_slug = proper_unicode_slugify(post_instance.title) or 'news'
        title_slug = title_slug[:150].strip('-')
        
        kw_part = ""
        if post_instance.seo_keywords:
            # Split keywords by commas/semicolons and slugify each
            kw_list = [proper_unicode_slugify(kw) for kw in re.split(r'[,;]+', post_instance.seo_keywords)]
            kw_list = [kw for kw in kw_list if kw]
            if kw_list:
                kw_part = "-" + "-".join(kw_list)
        
        div_ascii = DIVISION_SLUG_MAP.get(post_instance.division, proper_unicode_slugify(post_instance.division) or 'bd')
        date_str = str(post_instance.date)
        
        final_slug = f"{post_instance.pk}-{title_slug}{kw_part}-{div_ascii}-{date_str}"
        
    if len(final_slug) > 290:
        final_slug = final_slug[:290].strip('-')
        
    return final_slug


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
    author_name = models.CharField(max_length=100, default='অপরাধনামা ডেক্স', help_text="Author or reporter name for Google News transparency")
    date = models.DateField(db_index=True)
    division = models.CharField(max_length=100, db_index=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_user_report = models.BooleanField(default=False, help_text='Mark as a raw user submission from the public report form')
    is_sensitive_image = models.BooleanField(default=False, help_text='Mark if the image contains sensitive content (blur effect)')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # SEO slug — auto-populated on save; unique across all posts
    slug = models.SlugField(
        max_length=300,
        unique=True,
        blank=True,
        allow_unicode=True,
        help_text="Auto-generated SEO-friendly URL segment. Format: {id}-{title}-{division}-{date}",
    )
    custom_slug = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        help_text="Custom URL slug segment (optional). If provided, it overrides the auto-generated title slug."
    )
    seo_keywords = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        help_text="Optional SEO keywords to push/append into the URL slug (comma-separated)."
    )

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.slug = generate_post_slug(self)
            Post.objects.filter(pk=self.pk).update(slug=self.slug)
        else:
            self.slug = generate_post_slug(self)
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


class Campaign(models.Model):
    title = models.CharField(max_length=255, default="অবিস্মরণীয় জুলাই")
    is_active = models.BooleanField(default=False, help_text="Toggle to activate this campaign on the frontend.")
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({'Active' if self.is_active else 'Inactive'})"


class CampaignDay(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="days")
    day_number = models.PositiveIntegerField(help_text="e.g. 15 for 15th day")
    date = models.DateField(db_index=True)
    video_url = models.URLField(blank=True, default='', help_text="YouTube or Facebook video link (optional)")
    image = models.ImageField(upload_to='campaigns/', blank=True, null=True, help_text="Optional image if video is not available")
    summary_text = models.TextField(blank=True, default='', help_text="Narrative for this day")
    read_more_link = models.URLField(blank=True, default='', help_text="Link to read today's analysis")

    class Meta:
        ordering = ['date', 'day_number']
        unique_together = ('campaign', 'date')

    def __str__(self):
        return f"{self.campaign.title} - Day {self.day_number}"
