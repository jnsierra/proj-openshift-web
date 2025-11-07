# Dockerfile para aplicación Next.js

# Etapa 1: Dependencias
FROM node:20-alpine AS deps
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Etapa 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de la aplicación
RUN npm run build

# Etapa 3: Runner (imagen final)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cambiar permisos
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
