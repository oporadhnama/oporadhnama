import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()


def drop_conflicting_slug_indexes():
    """Unconditionally drop any slug‑related indexes that might remain."""
    with connection.cursor() as cursor:
        print("Dropping possible leftover slug indexes...")
        cursor.execute('DROP INDEX IF EXISTS "archive_post_slug_7abefc9f_like";')
        cursor.execute('DROP INDEX IF EXISTS "archive_post_slug_key";')
        cursor.execute('DROP INDEX IF EXISTS "archive_post_slug_7abefc9f";')
        print("Index cleanup complete.")


if __name__ == '__main__':
    try:
        drop_conflicting_slug_indexes()
    except Exception as exc:
        print(f"[cleanup_db] error: {exc}")
