FROM node:22-alpine3.20

EXPOSE 9090

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev

COPY build .

COPY .docker.env .env

CMD ["sh", "-c", "npm run docker-migrate up && npm run docker-start"]