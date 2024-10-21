#!/bin/sh

MIGRATION_STATUS=$(npx prisma migrate status)

# 检查 Prisma 数据库是否需要迁移。如果数据库已经是最新状态，输出 "No migrations needed."。
if echo "$MIGRATION_STATUS" | grep -q "Database schema is up to date"; then
    echo "No migrations needed."
else
# 如果需要迁移，输出 "Running migrations..." 并应用所有未完成的迁移
    echo "Running migrations..."
    npx prisma migrate deploy
fi

# 迁移完成后，构建项目并启动。
pnpm build && pnpm start
