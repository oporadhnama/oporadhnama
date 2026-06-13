from django.test import TestCase
from rest_framework.test import APIClient
from archive.models import Category, Post
import datetime


class PublicStatsViewTest(TestCase):
    def setUp(self):
        # create categories
        self.cat_names = ['খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'দুর্নীতি', 'অন্যান্য']
        self.categories = [Category.objects.create(name=n) for n in self.cat_names]

        # create posts: 2 posts per category except "অন্যান্য" gets 1
        posts = []
        for i, cat in enumerate(self.categories):
            count = 2 if cat.name != 'অন্যান্য' else 1
            for j in range(count):
                posts.append(Post.objects.create(
                    title=f"Post {i}-{j}",
                    description="desc",
                    division='ঢাকা',
                    date=datetime.date.today(),
                    is_user_report=False,
                    category=cat,
                ))

        self.client = APIClient()

    def test_public_stats_counts(self):
        resp = self.client.get('/api/public-stats/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()

        # totals
        self.assertEqual(data.get('total_posts'), Post.objects.filter(is_user_report=False).count())
        self.assertEqual(data.get('total_categories'), Category.objects.count())

        # per-category counts
        for cat in self.categories:
            expected = Post.objects.filter(category=cat, is_user_report=False).count()
            self.assertEqual(data.get(cat.name), expected)
