FROM node:20-bullseye

WORKDIR /app

COPY loadbalancer/package*.json ./
RUN npm install --only=production

COPY loadbalancer/server.js ./server.js

EXPOSE 3002

CMD ["node", "server.js"]

