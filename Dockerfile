FROM node:18-alpine3.16

ARG TOKEN
ARG GUILD_ID
ARG MEMBER_ID
ARG CLIENT_ID

ENV TOKEN $TOKEN
ENV GUILD_ID $GUILD_ID
ENV MEMBER_ID $MEMBER_ID
ENV CLIENT_ID $CLIENT_ID

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

CMD [ "pnpm", "start" ]