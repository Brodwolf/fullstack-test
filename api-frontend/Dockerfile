# Set the base image
FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=build-stage /app/dist .
RUN yarn global add http-server

CMD ["http-server", "/app/"]
EXPOSE 8080