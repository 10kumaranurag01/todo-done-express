FROM node:22-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY . .
RUN npm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001 -G nodejs

RUN chown -R nodeuser:nodejs ./

USER nodeuser

CMD ["npm", "run", "dev"]