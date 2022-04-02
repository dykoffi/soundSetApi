# ################### Building Stage #######################

FROM dykoffi/node:alpine as base

WORKDIR /App
RUN yarn global add cqx
COPY package.json ./
RUN yarn install

COPY . ./

RUN cqx build

# ################### Release Stage #######################

FROM base as release

WORKDIR /App
COPY --from=base /App/build/package.json ./
RUN yarn install --prod
COPY --from=base /App/build ./

WORKDIR /App/build
RUN prisma generate

EXPOSE 80

CMD echo "DATABASE_URL=${DATABASE_URL}" > .env \
    && prisma migrate deploy \
    && NODE_ENV=production pm2-runtime index.js --name soundSetApi