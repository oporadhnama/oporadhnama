#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
python cleanup_db.py
python manage.py migrate
python manage.py collectstatic --no-input