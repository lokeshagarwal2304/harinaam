#!/bin/sh
set -e

echo "=== Harinaam Laravel Production Startup ==="

# Wait for DB if DB_HOST is set
if [ -n "$DB_HOST" ]; then
  echo "Database host configured: $DB_HOST:$DB_PORT"
fi

# Run Database Migrations and Seeders
echo "Running database migrations..."
php artisan migrate --force --no-interaction || true

echo "Seeding initial sacred Naams..."
php artisan db:seed --force --no-interaction || true

# Cache configurations and routes for high-performance production
echo "Caching Laravel configuration and routes..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "=== Starting Web Server ==="
exec "$@"
