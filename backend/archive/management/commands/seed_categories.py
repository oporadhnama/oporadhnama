from django.core.management.base import BaseCommand
from archive.models import Category

class Command(BaseCommand):
    help = 'Seeds default categories: খুন, ধর্ষণ, চাঁদাবাজি, অন্যান্য'

    def handle(self, *args, **options):
        categories = ["খুন", "ধর্ষণ", "চাঁদাবাজি", "অন্যান্য"]
        for idx, cat_name in enumerate(categories, 1):
            category, created = Category.objects.get_or_create(name=cat_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created category #{idx}'))
            else:
                self.stdout.write(self.style.WARNING(f'Category #{idx} already exists'))
