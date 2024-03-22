FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /node-app

COPY "server.js" "server.js"
COPY "package.json" "package.json"
COPY "plugin/logger.js" "plugin/logger.js"

RUN npm install

# Starting our application
CMD [ "node", "server.js" ]

# Exposing server port
EXPOSE 3001
EXPOSE 8081