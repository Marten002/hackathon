FROM node:21.1.0

WORKDIR /app

COPY . .
RUN yarn clear
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
