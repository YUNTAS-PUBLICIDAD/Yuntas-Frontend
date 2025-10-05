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

# Instalar servidor HTTP simple para servir archivos estáticos
RUN npm install -g serve

# Copiar solo los archivos construidos
COPY --from=builder /app/dist ./dist

EXPOSE 4321

# Servir los archivos estáticos con serve (sin -s para permitir navegación multi-página)
CMD ["serve", "dist", "-l", "4321"]
