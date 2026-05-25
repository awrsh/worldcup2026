# Docker — دو ایمیج جدا (فرانت + API)

## فایل‌ها

| ایمیج | Dockerfile | Context |
|--------|------------|---------|
| Frontend (Next.js, پورت 3000) | `Dockerfile.frontend` | ریشهٔ ریپو |
| API (NestJS, پورت 8585) | `backend/Dockerfile` | پوشهٔ `backend/` |

## ساخت محلی

```bash
# مقادیر را در .env.local یا export کنید — در کد پیش‌فرضی وجود ندارد
export NEXT_PUBLIC_APP_BASE_URL=...
export NEXT_PUBLIC_API_URL=...

docker build -f Dockerfile.frontend \
  --build-arg NEXT_PUBLIC_APP_BASE_URL \
  --build-arg NEXT_PUBLIC_API_URL \
  -t world-cup-frontend:latest .

docker build -f backend/Dockerfile -t world-cup-api:latest backend/
```

یا با اسکریپت:

```bash
sh ci/docker-build.sh
```

## اجرا با Compose

```bash
export FRONTEND_IMAGE=world-cup-frontend:latest
export API_IMAGE=world-cup-api:latest
# backend/.env — DATABASE_URL، FRONTEND_URL و ...
docker compose up -d
```

پورت‌ها: فرانت `3000`، API `8585` (با `FRONTEND_HOST_PORT` / `API_HOST_PORT` قابل تغییر است).

## GitLab CI

جاب پیش‌فرض `build` از `Dockerfile.frontend` است (`DOCKERFILE_PATH_*` در `.gitlab-ci.yml`).

برای **ایمیج دوم (API)** یک جاب build جدا اضافه کنید (مثال — نام anchor را با `templates/build/build.yml` در `devops/ci-templates` v8 تطبیق دهید):

```yaml
build_api:
  extends: build
  variables:
    DOCKERFILE_PATH: backend/Dockerfile
    DOCKER_BUILD_CONTEXT: backend
  # در صورت پشتیبانی تمپلیت: IMAGE_SUFFIX یا نام ایمیج = ${CI_REGISTRY_IMAGE}-api
```

روی سرور deploy در `docker-compose.yml` یا متغیرهای CI:

- `FRONTEND_IMAGE=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA`
- `API_IMAGE=$CI_REGISTRY_IMAGE-api:$CI_COMMIT_SHORT_SHA`

متغیرهای `NEXT_PUBLIC_*` و `FRONTEND_URL` در `ci/env-variables.yml` تعریف شده‌اند.
