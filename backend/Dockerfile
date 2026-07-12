FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
# Copy raw schema and seed files because migrate.js reads them dynamically
COPY src/db/*.sql ./dist/db/

EXPOSE 5000
CMD ["node", "dist/index.js"]
