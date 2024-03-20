FROM node:hydrogen-alpine3.18

ENV NODE_ENV development

WORKDIR /node-app

COPY "contact-server.js" "contact-server.js"


# Starting our application
# para ejecutar esto vamos a utilizar el siguiente docker run
CMD ["node", "contact-server.js"]

# Exposing server port que el cliente requiere
EXPOSE 3006