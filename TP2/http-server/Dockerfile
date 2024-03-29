FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /http-server

COPY . .
RUN npm install

# Starting our application
CMD [ "npm", "run", "dev" ]

# Exposing server port
EXPOSE 3000