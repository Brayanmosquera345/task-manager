# ==========================
# 🏗️ Etapa de build
# ==========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================
# 🚀 Etapa de producción
# ==========================
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/data-source.ts ./data-source.ts

# Copiamos los scripts de migración también
COPY --from=builder /app/src/database ./src/database

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run:prod && npm run start:prod"]
