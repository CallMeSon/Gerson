# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Pass VITE_APP_MODE as build argument (defaults to guest)
ARG VITE_APP_MODE=guest
ENV VITE_APP_MODE=$VITE_APP_MODE

# Build the app using the selected mode (loads .env.guest or .env.admin)
RUN npm run build -- --mode $VITE_APP_MODE

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
