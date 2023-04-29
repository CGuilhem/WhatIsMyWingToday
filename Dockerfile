FROM node:18-alpine3.16

RUN --mount=type=secret,id=token \
    --mount=type=secret,id=guild_id \ 
    --mount=type=secret,id=member_id \
    --mount=type=secret,id=client_id \
    export token=$(cat /run/secrets/token) \
    export guild_id=$(cat /run/secrets/guild_id) \
    export member_id=$(cat /run/secrets/member_id) \
    export client_id=$(cat /run/secrets/client_id)

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

CMD [ "pnpm", "start" ]