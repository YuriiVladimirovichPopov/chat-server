FROM node:21.6.1

WORKDIR  /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start:dev"]