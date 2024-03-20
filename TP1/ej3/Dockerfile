FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /node-app

COPY "server.js" "server.js"

# Starting our application
CMD [ "node", "server.js" ]

# Exposing server port
EXPOSE 3003
EXPOSE 8083