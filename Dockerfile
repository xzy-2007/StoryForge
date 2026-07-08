FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

RUN apk add --no-cache python3 make g++ \
  && addgroup -S storyforge && adduser -S storyforge -G storyforge

WORKDIR /app

COPY --from=builder /app/out ./out
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER storyforge

EXPOSE 5173

CMD ["npx", "electron-vite", "preview"]