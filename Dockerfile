FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

RUN chmod +x /startup.sh

EXPOSE 3000

ENTRYPOINT ["/startup.sh"]
