# ################### Building Stage #######################

FROM dykoffi/node:light as base

WORKDIR /App
RUN yarn global add cqx@latest prisma@latest
COPY package.json ./
RUN yarn install

COPY . ./

RUN prisma generate

RUN cqx build

# ################### Release Stage #######################

FROM dykoffi/node:alpine as release

WORKDIR /App
COPY --from=base /App/build/package.json ./
RUN yarn install --prod
COPY --from=base /App/build ./

WORKDIR /App/build
RUN ls
RUN cat ./package.json
RUN prisma generate

EXPOSE 80

CMD echo "DATABASE_URL=${DATABASE_URL}" > .env \
    && prisma migrate deploy \
    && NODE_ENV=production pm2-runtime index.js --name soundSetApi