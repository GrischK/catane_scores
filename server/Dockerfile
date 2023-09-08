FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i --legacy-peer-deps

COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

CMD npm start