FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /node-app

COPY "client-server.js" "client-server.js"

ARG 1
ARG 2

# Starting our application
# para ejecutar esto vamos a utilizar el siguiente docker run
# docker run -ti --rm server-clientej4:server-clientej4 client-server.js 172.17.0.2 3002 localhost 3001 3003
CMD ["node", "client-server.js","$1","$2"]

# Exposing server port que el cliente requiere

#EXPOSE 0