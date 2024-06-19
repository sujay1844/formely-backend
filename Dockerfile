FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 8080
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
