# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar caché
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production=false

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Runtime
FROM node:20-slim

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 4321

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4321"]
