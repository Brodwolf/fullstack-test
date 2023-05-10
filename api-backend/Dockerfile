FROM node:16.14 AS build
WORKDIR /home/node/app
COPY ["package.json", "yarn.lock", "./"]
COPY prisma prisma
RUN yarn install --frozen-lockfile
COPY ["tsconfig.json", "./"]
COPY src src
RUN yarn build

FROM node:16.14 AS production
WORKDIR /home/node/app
ENV SERVER_PORT=9098
ENV DEBBUGER_POLICY=1
ENV LOG_FOLDER="./logs"
ENV BACKEND_USER="magazord"
ENV BACKEND_PASSWORD="magazord123"
ENV DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
RUN chown -R node .
USER node
COPY --from=build /home/node/app/prisma ./
COPY --from=build /home/node/app/node_modules node_modules/
COPY --from=build /home/node/app/package.json ./
COPY --from=build /home/node/app/yarn.lock ./
COPY --from=build /home/node/app/dist dist/
EXPOSE 9098

CMD [ "node", "dist/Main.js" ]