FROM node:alpine

RUN apk update

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx run generate

CMD ["npm","run","start:dev"]