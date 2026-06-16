# Migration: add_post_slug
# Uses a 3-step approach:
#   1. Add slug column WITHOUT unique constraint (allows blank for existing rows)
#   2. Backfill slugs for every existing Post via a data migration
#   3. Add the unique constraint

from django.db import migrations, models


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


def backfill_slugs(apps, schema_editor):
    """Populate slug for every existing Post that has no slug yet."""
    Post = apps.get_model('archive', 'Post')
    for post in Post.objects.filter(slug=''):
        div = DIVISION_SLUG_MAP.get(post.division, post.division.lower().replace(' ', '-') or 'bd')
        # Keep only ASCII-safe chars; strip leading/trailing hyphens
        import re
        div = re.sub(r'[^a-z0-9\-]', '', div).strip('-') or 'bd'
        date_str = str(post.date)
        post.slug = f"{post.pk}-{div}-{date_str}"
        post.save(update_fields=['slug'])


def reverse_backfill(apps, schema_editor):
    Post = apps.get_model('archive', 'Post')
    Post.objects.all().update(slug='')


class Migration(migrations.Migration):

    dependencies = [
        ('archive', '0006_alter_post_description'),
    ]

    operations = [
        # Step 1 — Add slug field WITHOUT unique=True so existing blank rows are fine
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(
                blank=True,
                default='',
                help_text='Auto-generated SEO-friendly URL segment. Format: {id}-{division}-{date}',
                max_length=300,
            ),
        ),

        # Step 2 — Data migration: fill slugs for all existing posts
        migrations.RunPython(backfill_slugs, reverse_backfill),

        # Step 3 — Now that every row has a unique value, add the unique constraint
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(
                blank=True,
                help_text='Auto-generated SEO-friendly URL segment. Format: {id}-{division}-{date}',
                max_length=300,
                unique=True,
            ),
        ),
    ]
