#!/usr/bin/env bash
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running static files collection..."
python manage.py collectstatic --no-input

echo "Applying database migrations..."
python manage.py migrate

echo "Running post-migration scripts..."
python cleanup_db.py
python setup_admin.py
python fix_categories.py

echo "Resetting PostgreSQL sequences (fixes new-insert 500s after DB migration)..."
python reset_sequences.py

echo "Build finished successfully!"