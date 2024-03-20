FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /service-checker

COPY "server.js" "server.js"
COPY "package.json" "package.json"

RUN npm install

# Starting our application
CMD [ "node", "server.js" ]

# Exposing server port
EXPOSE 8000