import os
import django
from django.db import connection

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

def cleanup():
    vendor = connection.vendor
    print(f"Database vendor detected: {vendor}")
    
    if vendor != 'postgresql':
        print("Not using PostgreSQL. Skipping database cleanup.")
        return

    with connection.cursor() as cursor:
        # Check if migration 0007 has already been applied
        cursor.execute("SELECT EXISTS (SELECT 1 FROM django_migrations WHERE app='archive' AND name='0007_add_post_slug');")
        migration_applied = cursor.fetchone()[0]
        
        if migration_applied:
            print("Migration 0007_add_post_slug is already applied. No cleanup needed.")
            return
            
        print("Migration 0007_add_post_slug is NOT applied. Cleaning up conflicting database objects...")
        
        # Drop the slug column if it exists. Under PostgreSQL, CASCADE will also drop any
        # indexes or constraints depending on this column.
        cursor.execute("""
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.columns 
                WHERE table_name='archive_post' AND column_name='slug'
            );
        """)
        column_exists = cursor.fetchone()[0]
        if column_exists:
            print("Column 'slug' exists on archive_post. Dropping it with CASCADE...")
            cursor.execute("ALTER TABLE archive_post DROP COLUMN IF EXISTS slug CASCADE;")
            print("Dropped column 'slug'.")
            
        # Manually drop any indexes if they somehow still remain
        print("Dropping slug-related indexes if they exist...")
        cursor.execute("DROP INDEX IF EXISTS archive_post_slug_7abefc9f_like;")
        cursor.execute("DROP INDEX IF EXISTS archive_post_slug_7abefc9f;")
        cursor.execute("DROP INDEX IF EXISTS archive_post_slug_key;")
        print("Cleanup completed successfully.")

if __name__ == "__main__":
    try:
        cleanup()
    except Exception as e:
        print(f"Error during database cleanup: {e}")
        # We don't want to crash the build if cleanup fails for permission/other reasons,
        # but printing the error will help us debug.
