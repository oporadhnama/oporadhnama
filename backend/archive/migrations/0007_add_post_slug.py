# Migration: add_post_slug
# 3-step approach:
#   1. Add slug column with db_index=False — NO indexes created at this step
#   2. Backfill slugs for all existing rows
#   3. Add ALL indexes explicitly via RunSQL with IF NOT EXISTS
#      (safe for fresh deploys AND re-deploys where indexes may already exist)

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
    import re
    Post = apps.get_model('archive', 'Post')
    for post in Post.objects.filter(slug=''):
        div = DIVISION_SLUG_MAP.get(
            post.division,
            post.division.lower().replace(' ', '-') or 'bd'
        )
        div = re.sub(r'[^a-z0-9\-]', '', div).strip('-') or 'bd'
        post.slug = f"{post.pk}-{div}-{post.date}"
        post.save(update_fields=['slug'])


def reverse_backfill(apps, schema_editor):
    Post = apps.get_model('archive', 'Post')
    Post.objects.all().update(slug='')


class Migration(migrations.Migration):

    dependencies = [
        ('archive', '0006_alter_post_description'),
    ]

    operations = [
        # Step 1 — Add slug column with NO indexes (db_index=False, no unique)
        #           This prevents Django from auto-creating archive_post_slug_7abefc9f_like
        #           at AddField time, which would then conflict in Step 3.
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(
                blank=True,
                db_index=False,      # ← KEY: suppress all automatic index creation
                default='',
                help_text='Auto-generated SEO-friendly URL segment. Format: {id}-{division}-{date}',
                max_length=300,
            ),
        ),

        # Step 2 — Backfill slugs for existing rows
        migrations.RunPython(backfill_slugs, reverse_backfill),

        # Step 3 — Create ALL indexes using IF NOT EXISTS so this migration is
        #           fully idempotent regardless of the current database state.
        migrations.RunSQL(
            sql=[
                # Unique constraint index
                'CREATE UNIQUE INDEX IF NOT EXISTS "archive_post_slug_key" ON "archive_post" ("slug");',
                # varchar_pattern_ops index — the one that kept conflicting
                'CREATE INDEX IF NOT EXISTS "archive_post_slug_7abefc9f_like" ON "archive_post" ("slug" varchar_pattern_ops);',
            ],
            reverse_sql=[
                'DROP INDEX IF EXISTS "archive_post_slug_7abefc9f_like";',
                'DROP INDEX IF EXISTS "archive_post_slug_key";',
            ],
            # Tell Django's ORM state that slug is now unique=True
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
