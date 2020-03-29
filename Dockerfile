FROM node:10-alpine as base

RUN apk update \
    && apk add --no-cache tini \
    && apk add --no-cache curl

ENV PATH /node_modules/.bin:$PATH

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

ENTRYPOINT ["tini", "--"]

FROM base as dev

ENV NODE_ENV=development

RUN npm i

FROM dev as test

COPY . .

RUN npm run test

FROM test as build

RUN npm run build

FROM base as prod
COPY --from=build /app/node_modules/ /app/node_modules/
COPY --from=build /app/dist/ /app/dist/

CMD ["node", "./dist/index.js"]