#!/usr/bin/env bash
set -euo pipefail

if [[ -f .env ]]; then
  export $(grep -v '^\s*#' .env | xargs)
fi

echo "Setting environment variables..."
cp .env Application/api/

mysql --host="$DB_HOST" \
      --user="$DB_USER" \
      --password="$DB_PASS" \
      --batch --silent \
      --execute="CREATE DATABASE IF NOT EXISTS index5_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "Schema index5_db is ready."

# 2) Import the dump into that schema
mysql --host="$DB_HOST" \
      --user="$DB_USER" \
      --password="$DB_PASS" \
      "index5_db" < "./DB/dumps/index5_db.sql"

echo "Imported dump into index5_db."
