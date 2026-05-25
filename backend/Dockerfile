# World Cup 2026 — NestJS API
# Build: docker build -f Dockerfile -t world-cup-api .
# Context: backend/ directory

# ---------------------------
# Builder
# ---------------------------
FROM reg.cinnagen.com:8083/node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm config set registry https://reg.cinnagen.com/repository/npm-group/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-timeout 300000

RUN npm ci --no-audit --loglevel verbose \
    && npm cache clean --force

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json nest-cli.json ./

RUN npx prisma generate \
    && npm run build

# ---------------------------
# Production
# ---------------------------
FROM reg.cinnagen.com:8083/node:20-slim AS production

WORKDIR /app

ENV NODE_ENV=production

RUN groupadd -g 65532 nonroot && \
    useradd -u 65532 -g nonroot -d /home/nonroot -s /bin/sh -m nonroot

COPY package.json package-lock.json* ./

RUN npm config set registry https://reg.cinnagen.com/repository/npm-group/ && \
    npm ci --omit=dev --no-audit \
    && npm cache clean --force

COPY prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

RUN npx prisma generate

RUN chown -R nonroot:nonroot /app /home/nonroot

USER nonroot:nonroot

EXPOSE 8585

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 8585) + '/api/docs', (r) => { r.resume(); process.exit(r.statusCode && r.statusCode < 500 ? 0 : 1) }).on('error', () => process.exit(1))"

CMD ["node", "dist/main.js"]
