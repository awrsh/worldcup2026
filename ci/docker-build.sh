#!/bin/sh
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -f .env.local ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env.local
  set +a
fi

: "${NEXT_PUBLIC_APP_BASE_URL:?Set NEXT_PUBLIC_APP_BASE_URL in .env.local or the environment}"
: "${NEXT_PUBLIC_API_URL:?Set NEXT_PUBLIC_API_URL in .env.local or the environment}"

echo "Building frontend (NEXT_PUBLIC_APP_BASE_URL set)"
docker build -f Dockerfile.frontend \
  --build-arg "NEXT_PUBLIC_APP_BASE_URL=$NEXT_PUBLIC_APP_BASE_URL" \
  --build-arg "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" \
  -t world-cup-frontend:latest \
  .

echo "Done: world-cup-frontend:latest"
echo "API image: build from World-Cup-Bk repository"
