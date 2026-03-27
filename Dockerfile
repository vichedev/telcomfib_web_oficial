# Etapa de build
FROM node:20 AS build

WORKDIR /app

# 1. Copiar solo package.json primero
COPY package.json package-lock.json* ./

# 2. Limpiar y reinstalar desde cero (esto es clave)
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install

# 3. Copiar el resto del código
COPY . .

# 4. Construir la app
RUN npx vite build

# Etapa de producción
FROM nginx:alpine

# Crear usuario y grupo no-root
RUN addgroup -g 1001 -S Telcomfib && \
    adduser -S -D -H -u 1001 -s /bin/sh -G Telcomfib Telcomfib

# Configurar nginx para usuario no-root
RUN mkdir -p /tmp/nginx && \
    chown -R Telcomfib:Telcomfib /var/cache/nginx /tmp/nginx && \
    chmod -R 755 /var/cache/nginx /tmp/nginx

# Copiar configuraciones PRIMERO
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copiar build del frontend
COPY --from=build --chown=Telcomfib:Telcomfib /app/dist /usr/share/nginx/html

# Cambiar a usuario no-root
USER Telcomfib

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]