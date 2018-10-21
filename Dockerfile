FROM node:8-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM node:8-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["yarn", "start"]