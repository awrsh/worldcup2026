# Docker — Frontend (Wolrd-Cup)

API lives in the separate **World-Cup-Bk** repository.

## Frontend image

| ایمیج | Dockerfile | Context |
|--------|------------|---------|
| Next.js (host `8080` → container `3000`) | `Dockerfile.frontend` | ریشهٔ این ریپو |

```bash
export NEXT_PUBLIC_APP_BASE_URL=...
export NEXT_PUBLIC_API_URL=...

docker build -f Dockerfile.frontend \
  --build-arg NEXT_PUBLIC_APP_BASE_URL \
  --build-arg NEXT_PUBLIC_API_URL \
  -t world-cup-frontend:latest .

# or
sh ci/docker-build.sh
```

```bash
FRONTEND_IMAGE=world-cup-frontend:latest docker compose up -d
```

## API image

Build and deploy from **World-Cup-Bk**:

```bash
cd ../World-Cup-Bk
docker build -t world-cup-api:latest .
docker compose up -d api
```

GitLab variables for the API project: see `World-Cup-Bk/ci/env-variables.yml`.

Frontend GitLab variables: `NEXT_PUBLIC_APP_BASE_URL`, `NEXT_PUBLIC_API_URL` in `ci/env-variables.yml`.
