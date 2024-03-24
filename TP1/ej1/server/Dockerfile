# Utilizar la imagen base de Node.js en Alpine
FROM node:hydrogen-alpine3.18

# Establecer la variable de entorno NODE_ENV
ENV NODE_ENV development

# Crear un usuario no root
RUN addgroup -g 6585 norootuser && \
    adduser -u 6585 -G norootuser -s /bin/sh -D norootuser

# Establecer el directorio de trabajo
WORKDIR /node-app

# Copiar los archivos necesarios al contenedor
COPY "server.js" "server.js"
COPY "package.json" "package.json"
COPY "plugin/logger.js" "plugin/logger.js"

# Cambiar el propietario de los archivos copiados al usuario no root
RUN chown -R norootuser:norootuser .

# Cambiar al usuario no root
USER norootuser

# Instalar dependencias
RUN npm install

# Comando para iniciar la aplicación
CMD [ "node", "server.js" ]

# Exponer los puertos utilizados por el servidor
EXPOSE 3001
EXPOSE 8081
