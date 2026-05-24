# ---------------------------
# Builder stage
# ---------------------------
FROM reg.cinnagen.com:8083/node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./

RUN npm config set registry https://reg.cinnagen.com/repository/npm-group/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-timeout 300000

RUN npm ci --legacy-peer-deps --include=optional --no-audit --loglevel verbose \
    && npm cache clean --force

COPY . .

# CI may write .env (envfile scope) before docker build for NEXT_PUBLIC_* at build time.
RUN npm run build \
    && npm cache clean --force \
    && rm -rf /tmp/* /var/tmp/* /root/.npm /root/.node-gyp


# ---------------------------
# Setup stage (permissions + Next standalone artifacts)
# ---------------------------
FROM reg.cinnagen.com:8083/node:20-slim AS setup

WORKDIR /app

RUN groupadd -g 65532 nonroot && \
    useradd -u 65532 -g nonroot -d /home/nonroot -s /bin/sh -m nonroot

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nonroot:nonroot /app /home/nonroot \
    && chmod -R 755 /app \
    && chmod 700 /home/nonroot \
    && rm -rf /tmp/* /var/tmp/*


# ---------------------------
# Final runner stage – distroless
# ---------------------------
FROM reg.cinnagen.com:8083/distroless/nodejs24-debian13 AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
# PORT and runtime secrets via docker-compose / GitLab CI variables

COPY --from=setup --chown=65532:65532 /app ./

USER 65532:65532

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
    CMD ["node", "-e", "require('http').get('http://127.0.0.1:' + (process.env.PORT || 3000) + '/', (r) => { r.resume(); process.exit(r.statusCode && r.statusCode < 500 ? 0 : 1) }).on('error', () => process.exit(1))"]

CMD ["server.js"]
