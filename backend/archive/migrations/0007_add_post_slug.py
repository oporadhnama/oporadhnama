# Migration: add_post_slug
# Uses a 3-step approach:
#   1. Add slug column WITHOUT unique constraint (allows blank for existing rows)
#   2. Backfill slugs for every existing Post via a data migration
#   3. Add the unique constraint + index safely using IF NOT EXISTS

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

        # Step 3 — Add unique constraint via RunSQL using IF NOT EXISTS
        # to safely handle re-deploys where index may already exist.
        migrations.RunSQL(
            sql=[
                # Add unique index (handles the unique=True constraint)
                "CREATE UNIQUE INDEX IF NOT EXISTS archive_post_slug_key ON archive_post (slug);",
                # Add the like index Django creates for varchar fields with db_index
                "CREATE INDEX IF NOT EXISTS archive_post_slug_7abefc9f_like ON archive_post (slug varchar_pattern_ops);",
            ],
            reverse_sql=[
                "DROP INDEX IF EXISTS archive_post_slug_7abefc9f_like;",
                "DROP INDEX IF EXISTS archive_post_slug_key;",
            ],
            state_operations=[
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
            ],
        ),
    ]
