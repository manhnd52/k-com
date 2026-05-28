# Stage 1: build
FROM node:25-slim AS builder

WORKDIR /app

# copy package
COPY package*.json ./

# install deps
RUN npm install

# copy source
COPY . .

# build
RUN npm run build

# Stage 2: serve bằng nginx
FROM nginx:alpine

# copy build ra nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]