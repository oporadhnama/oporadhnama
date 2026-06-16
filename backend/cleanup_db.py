import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()


def drop_conflicting_slug_indexes():
    """Unconditionally drop any slug‑related indexes that might remain."""
    with connection.cursor() as cursor:
        print("Dropping possible leftover slug indexes...")
        
        # Try both with and without quotes to ensure the indexes are dropped
        queries = [
            'DROP INDEX IF EXISTS archive_post_slug_7abefc9f_like;',
            'DROP INDEX IF EXISTS "archive_post_slug_7abefc9f_like";',
            'DROP INDEX IF EXISTS archive_post_slug_key;',
            'DROP INDEX IF EXISTS "archive_post_slug_key";',
            'DROP INDEX IF EXISTS archive_post_slug_7abefc9f;',
            'DROP INDEX IF EXISTS "archive_post_slug_7abefc9f";'
        ]
        
        for q in queries:
            try:
                cursor.execute(q)
                print(f"Executed: {q}")
            except Exception as e:
                print(f"Query '{q}' failed: {e}")
                
        print("Index cleanup complete.")


if __name__ == '__main__':
    try:
        drop_conflicting_slug_indexes()
        # Explicitly commit if not in autocommit mode
        if not connection.get_autocommit():
            connection.commit()
            print("Transaction committed successfully.")
    except Exception as exc:
        print(f"[cleanup_db] error: {exc}")
