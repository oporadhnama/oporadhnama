"""
reset_sequences.py
------------------
Resets PostgreSQL auto-increment sequences to match the current MAX(id)
for all tables. Run this after migrating data from another database
(e.g. Neon → Aiven) to fix "duplicate key" / 500 errors on new INSERTs.
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.db import connection

DB_ENGINE = connection.settings_dict.get("ENGINE", "")
if "postgresql" not in DB_ENGINE and "postgis" not in DB_ENGINE:
    print("Not a PostgreSQL database — skipping sequence reset.")
    exit(0)

print("Resetting PostgreSQL sequences...")

with connection.cursor() as cursor:
    # Fetch all sequences in the public schema
    cursor.execute("""
        SELECT
            seq.relname AS sequence_name,
            tab.relname AS table_name,
            col.attname AS column_name
        FROM pg_class seq
        JOIN pg_depend dep ON dep.objid = seq.oid
        JOIN pg_class tab ON tab.oid = dep.refobjid
        JOIN pg_attribute col ON col.attrelid = tab.oid AND col.attnum = dep.refobjsubid
        JOIN pg_namespace ns ON ns.oid = seq.relnamespace
        WHERE seq.relkind = 'S'
          AND ns.nspname = 'public'
        ORDER BY table_name;
    """)
    sequences = cursor.fetchall()

    if not sequences:
        print("No sequences found.")
    else:
        for seq_name, table_name, col_name in sequences:
            try:
                cursor.execute(
                    f'SELECT COALESCE(MAX("{col_name}"), 0) FROM "{table_name}"'
                )
                max_id = cursor.fetchone()[0]
                new_val = max(max_id, 1)
                cursor.execute(f"SELECT setval('{seq_name}', {new_val})")
                print(f"  ✓ {table_name}.{col_name} → sequence reset to {new_val}")
            except Exception as e:
                print(f"  ✗ {table_name}.{col_name} → FAILED: {e}")

print("Sequence reset complete.")
