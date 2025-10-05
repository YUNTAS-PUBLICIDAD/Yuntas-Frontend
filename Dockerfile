# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar caché
COPY package*.json ./

# Instalar dependencias (usar npm install porque package-lock.json puede no estar sincronizado)
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Runtime
FROM node:20-slim

WORKDIR /app

# Copiar archivos necesarios para SSR
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Variables de entorno
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

# Ejecutar servidor SSR de Astro
CMD ["node", "./dist/server/entry.mjs"]
