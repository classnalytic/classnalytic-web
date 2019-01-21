FROM node:8-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

RUN rm -rf node_modules

FROM node:8-alpine

WORKDIR /app

COPY --from=builder /app .

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]