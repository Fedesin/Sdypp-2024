FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /node-app

COPY "client-server.js" "client-server.js"
COPY "package.json" "package.json"
COPY "plugin/logger.js" "plugin/logger.js"

RUN npm install


ARG 1
ARG 2
ARG 3
ARG 4
ARG 5

# Starting our application
# para ejecutar esto vamos a utilizar el siguiente docker run
# docker run -ti --rm server-clientej4:server-clientej4 client-server.js 172.17.0.2 3002 localhost 3001 3003
CMD ["node", "client-server.js","$1","$2","$3","$4","$5"]

# Exposing server port que el cliente requiere
EXPOSE $2
EXPOSE $5