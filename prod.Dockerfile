FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

RUN pnpm build;

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

COPY prisma ./prisma/
COPY prod.startup.sh ./prod.startup.sh
RUN chmod +x /app/prod.startup.sh

ENTRYPOINT ["sh", "/app/prod.startup.sh"]
