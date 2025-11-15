FROM node:20-bullseye AS builder

WORKDIR /app

COPY client/package*.json ./
RUN npm ci

COPY client .

RUN npm run build

# Копируем статические файлы в dist и исправляем пути
RUN cp index.html dist/ && \
    cp style.css dist/ && \
    ([ -d assets ] && cp -r assets dist/ || true) && \
    ([ -d changelog ] && cp -r changelog dist/ || true) && \
    ([ -d privacy ] && cp -r privacy dist/ || true) && \
    ([ -d terms ] && cp -r terms dist/ || true) && \
    mkdir -p dist/src/network && \
    ([ -f src/network/network.worker.js ] && cp src/network/network.worker.js dist/src/network/ || true) && \
    sed 's|src/index.js|index.js|g' dist/index.html > dist/index.html.tmp && \
    mv dist/index.html.tmp dist/index.html

FROM nginx:1.27-alpine

# Удаляем дефолтную конфигурацию nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем простую конфигурацию nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

