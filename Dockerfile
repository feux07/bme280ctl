FROM node:12-slim

RUN apt-get update -y && apt-get install python make  g++-y

WORKDIR /usr/src/app/

COPY . .

RUN npm install

CMD [ "node", "start.js"]
