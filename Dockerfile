FROM node:12.20.1-alpine

WORKDIR /app

COPY package.json /app/
RUN npm install
COPY . /app

EXPOSE 1337

CMD [ "node", "server.js" ]