FROM node:18-alpine3.16

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

CMD [ "pnpm", "start" ]