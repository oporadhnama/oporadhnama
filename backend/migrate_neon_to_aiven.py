import os
import psycopg

NEON_URL  = os.environ.get("NEON_URL", "")
AIVEN_URL = os.environ.get("AIVEN_URL", "")

TABLE_ORDER = [
    'django_migrations',
    'django_content_type',
    'auth_permission',
    'auth_group',
    'auth_group_permissions',
    'auth_user',
    'auth_user_groups',
    'auth_user_user_permissions',
    'django_admin_log',
    'django_session',
    'archive_category',
    'archive_post',
    'archive_activitylog',
    'archive_campaign',
    'archive_campaignday',
]

def get_sequences(conn):
    with conn.cursor() as cur:
        cur.execute("""
            SELECT sequence_name FROM information_schema.sequences
            WHERE sequence_schema = 'public';
        """)
        return [row[0] for row in cur.fetchall()]

def get_sequence_value(conn, seq_name):
    with conn.cursor() as cur:
        try:
            cur.execute(f'SELECT last_value, is_called FROM public."{seq_name}";')
            return cur.fetchone()
        except Exception:
            return None

def copy_table(src_conn, dst_conn, table_name):
    with src_conn.cursor() as src_cur:
        src_cur.execute(f'SELECT * FROM public."{table_name}";')
        rows = src_cur.fetchall()
        if not rows:
            print(f"    [SKIP] {table_name} — 0 rows in Neon")
            return 0

        col_count = len(rows[0])
        placeholders = ", ".join(["%s"] * col_count)

        with dst_conn.cursor() as dst_cur:
            dst_cur.execute(f'TRUNCATE TABLE public."{table_name}" CASCADE;')
            dst_cur.executemany(
                f'INSERT INTO public."{table_name}" VALUES ({placeholders})',
                rows
            )
            dst_conn.commit()

    print(f"    [OK] {table_name} — {len(rows)} rows copied successfully")
    return len(rows)

def sync_sequences(src_conn, dst_conn):
    sequences = get_sequences(src_conn)
    print(f"\n==> Syncing {len(sequences)} sequence values...")
    for seq in sequences:
        val = get_sequence_value(src_conn, seq)
        if val:
            last_value, is_called = val
            with dst_conn.cursor() as cur:
                try:
                    cur.execute(
                        f"SELECT setval('public.\"{seq}\"', %s, %s);",
                        (last_value, is_called)
                    )
                    dst_conn.commit()
                    print(f"    [OK] {seq} → {last_value}")
                except Exception as err:
                    print(f"    [SKIP] {seq} sequence sync error: {err}")
                    dst_conn.rollback()

def main():
    if not NEON_URL or not AIVEN_URL:
        print("Please set NEON_URL and AIVEN_URL environment variables.")
        return

    print("==> Connecting to Neon (source)...")
    src_conn = psycopg.connect(NEON_URL)

    print("==> Connecting to Aiven (destination)...")
    dst_conn = psycopg.connect(AIVEN_URL)

    print(f"==> Migrating {len(TABLE_ORDER)} tables in dependency order...\n")

    total_rows = 0
    failed = []

    for table in TABLE_ORDER:
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
    print(f"==> Migration Completed!")
    print(f"    Total rows migrated from Neon to Aiven: {total_rows}")
    if failed:
        print(f"    Failed tables: {failed}")
    else:
        print(f"    All tables migrated to Aiven with 100% SUCCESS!")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
