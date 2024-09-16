#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install the dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Create a superuser if the CREATE_SUPERUSER variable is set
if [ "$CREATE_SUPERUSER" = "True" ]; then
  python manage.py createsuperuser --no-input --email "$DJANGO_SUPERUSER_EMAIL"
fi
