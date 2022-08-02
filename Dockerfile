FROM node:16.16.0-alpine
WORKDIR /usr/app
COPY package*.json .
COPY web ./web
COPY api ./api
RUN npm install
CMD ["npm", "run", "start:prod"]