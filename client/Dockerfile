FROM node:20-bullseye AS builder

WORKDIR /app

COPY client/package*.json ./
RUN npm ci

COPY client .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

