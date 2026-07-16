FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund --progress=false

COPY vite.config.js ./
COPY src/ ./src/
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=10000
ENV BACKEND_SCHEME=http
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=10000

EXPOSE 10000
