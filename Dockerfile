FROM node:16-alpine
WORKDIR /usr/app
COPY package.json .
COPY web ./web
COPY api ./api
RUN npm install --quiet
CMD ["npm", "run", "start:prod"]