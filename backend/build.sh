#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python cleanup_db.py          # মাইগ্রেশন চালানোর আগে নিরাপদে রিজন পরিষ্কার
python manage.py migrate
python setup_admin.py
python manage.py collectstatic --no-input
