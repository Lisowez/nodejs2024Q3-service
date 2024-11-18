FROM node:14-alpine
WORKDIR /usr/src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/main"]

