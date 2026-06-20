from django.contrib.syndication.views import Feed
from django.utils.feedgenerator import Rss201rev2Feed
from archive.models import Post

SITE_URL = 'https://oporadhnama.info'
API_BASE = 'https://oporadhnama.onrender.com'


class LatestPostsFeed(Feed):
    """
    Feature 4: RSS 2.0 feed for the latest 50 published posts.
    Exposed at /api/feed/rss/
    """
    feed_type = Rss201rev2Feed

    title = 'অপরাধনামা — বাংলাদেশের অপরাধ সংবাদ'
    link = SITE_URL
    description = (
        'অপরাধনামা — বাংলাদেশের অপরাধভিত্তিক সংবাদ, '
        'বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।'
    )
    language = 'bn'
    author_name = 'অপরাধনামা'

    def items(self):
        """Return the latest 50 published (non-user-report) posts."""
        return (
            Post.objects.select_related('category')
            .filter(is_user_report=False)
            .order_by('-created_at')[:50]
        )

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        """First 300 characters of the description as the RSS excerpt."""
        desc = (item.description or '').strip()
        return desc[:300] + '…' if len(desc) > 300 else desc

    def item_link(self, item):
        """Canonical URL on the frontend detail page."""
        slug = item.slug or str(item.id)
        return f'{SITE_URL}/news/{slug}'

    def item_pubdate(self, item):
        """Use created_at for accurate chronological ordering in feed readers."""
        return item.created_at

    def item_author_name(self, item):
        return 'অপরাধনামা'

    def item_categories(self, item):
        """Expose category name as an RSS <category> element."""
        if item.category_id:
            return [item.category.name]
        return []

    def item_enclosure_url(self, item):
        """Attach the post image as an RSS enclosure if available."""
        if not item.image:
            return None
        url = str(item.image)
        if url.startswith('http'):
            return url
        return f'{API_BASE}{url}'

    def item_enclosure_length(self, item):
        # Length is unknown for Cloudinary-hosted images; 0 is acceptable per spec
        return 0

    def item_enclosure_mime_type(self, item):
        return 'image/jpeg'
