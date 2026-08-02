"""
===================================================
  Database Migration Script: Neon -> Aiven
  Run with: python migrate_to_aiven.py
===================================================

BEFORE RUNNING:
  1. Paste your full Neon DATABASE_URL (from Render Dashboard -> Environment)
     into the NEON_URL variable below.
  2. Run this from your backend folder:
       cd d:/oporadhnama/backend
       .venv/Scripts/python migrate_to_aiven.py
"""

import os
import psycopg

# ─── CONFIGURATION ────────────────────────────────────────────────────────────
# Set NEON_URL and AIVEN_URL in your environment or replace placeholders below:
NEON_URL  = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_yiThNWwDYz37@ep-rough-king-aocecyud-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
AIVEN_URL = os.environ.get("AIVEN_URL", "postgres://avnadmin:REDACTED@pg-137778cf-oporadhnamabd-d849.e.aivencloud.com:25387/defaultdb?sslmode=require")




def get_tables(conn):
    """Return all user table names in the public schema, sorted by dependency."""
    with conn.cursor() as cur:
        cur.execute("""
            SELECT tablename FROM pg_tables
            WHERE schemaname = 'public'
            ORDER BY tablename;
        """)
        return [row[0] for row in cur.fetchall()]


def get_sequences(conn):
    """Return all sequences in the public schema."""
    with conn.cursor() as cur:
        cur.execute("""
            SELECT sequence_name FROM information_schema.sequences
            WHERE sequence_schema = 'public';
        """)
        return [row[0] for row in cur.fetchall()]


def get_sequence_value(conn, seq_name):
    """Get the last value of a sequence."""
    with conn.cursor() as cur:
        try:
            cur.execute(f'SELECT last_value, is_called FROM public."{seq_name}";')
            return cur.fetchone()
        except Exception:
            return None


def copy_table(src_conn, dst_conn, table_name):
    """Copy all rows from src table to dst table."""
    with src_conn.cursor() as src_cur:
        src_cur.execute(f'SELECT * FROM public."{table_name}";')
        rows = src_cur.fetchall()
        if not rows:
            print(f"    [SKIP] {table_name} — empty table")
            return 0

        col_count = len(rows[0])
        placeholders = ", ".join(["%s"] * col_count)

        with dst_conn.cursor() as dst_cur:
            # Disable triggers (e.g. FK checks) temporarily
            dst_cur.execute(f'ALTER TABLE public."{table_name}" DISABLE TRIGGER ALL;')
            # Clear existing data (in case of re-run)
            dst_cur.execute(f'TRUNCATE TABLE public."{table_name}" CASCADE;')
            # Insert all rows
            dst_cur.executemany(
                f'INSERT INTO public."{table_name}" VALUES ({placeholders})',
                rows
            )
            dst_cur.execute(f'ALTER TABLE public."{table_name}" ENABLE TRIGGER ALL;')
            dst_conn.commit()

    print(f"    [OK] {table_name} — {len(rows)} rows copied")
    return len(rows)


def sync_sequences(src_conn, dst_conn):
    """Sync all sequence values from src to dst so auto-increments continue correctly."""
    sequences = get_sequences(src_conn)
    print(f"\n==> Syncing {len(sequences)} sequences...")
    for seq in sequences:
        val = get_sequence_value(src_conn, seq)
        if val:
            last_value, is_called = val
            with dst_conn.cursor() as cur:
                cur.execute(
                    f"SELECT setval('public.\"{seq}\"', %s, %s);",
                    (last_value, is_called)
                )
            dst_conn.commit()
            print(f"    [OK] {seq} → {last_value}")


def main():
    if NEON_URL == "PASTE_YOUR_NEON_DATABASE_URL_HERE" or AIVEN_URL == "PASTE_YOUR_AIVEN_DATABASE_URL_HERE":
        print("ERROR: Please set NEON_URL and AIVEN_URL environment variables or update the placeholders in migrate_to_aiven.py.")
        return


    print("==> Connecting to Neon (source)...")
    src_conn = psycopg.connect(NEON_URL)
    print("    Connected to Neon [OK]")

    print("==> Connecting to Aiven (destination)...")
    dst_conn = psycopg.connect(AIVEN_URL)
    print("    Connected to Aiven [OK]\n")

    tables = get_tables(src_conn)
    print(f"==> Found {len(tables)} tables to migrate: {tables}\n")

    total_rows = 0
    failed = []

    for table in tables:
        try:
            total_rows += copy_table(src_conn, dst_conn, table)
        except Exception as e:
            print(f"    [FAIL] {table} — {e}")
            dst_conn.rollback()
            failed.append(table)

    sync_sequences(src_conn, dst_conn)

    src_conn.close()
    dst_conn.close()

    print(f"\n{'='*50}")
    print(f"==> Migration Complete!")
    print(f"    Total rows migrated: {total_rows}")
    if failed:
        print(f"    Failed tables (retry manually): {failed}")
    else:
        print(f"    All tables migrated successfully [OK]")
    print(f"{'='*50}")
    print("\nNEXT STEP: Update DATABASE_URL on Render to use your Aiven URL.")


if __name__ == "__main__":
    main()
