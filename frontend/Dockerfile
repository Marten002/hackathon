FROM node:20.9.0 AS build
ARG API_URL
WORKDIR /front
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build /front/build /opt/site
COPY --from=build /front/nginx.conf /etc/nginx/nginx.conf
