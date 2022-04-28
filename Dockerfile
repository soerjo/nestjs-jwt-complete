FROM node:alpine

RUN apk update

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

CMD ["npm","run","start:dev"]