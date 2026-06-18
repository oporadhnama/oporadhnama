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

echo "Build finished successfully!"