# Utilizar la imagen base de Node.js en Alpine
FROM node:hydrogen-alpine3.18

# Establecer el directorio de trabajo
WORKDIR /task-service

# Copiar los archivos necesarios al contenedor
COPY . .
RUN npm install

# Crear un grupo no root llamado "noroot"
RUN addgroup -g 6585 noroot

# Crear un usuario no root llamado "user" y agregarlo al grupo "noroot"
RUN adduser -u 6585 -G noroot -s /bin/sh -D user



RUN chown -R user:noroot .
RUN chmod -R 500 .

# Cambiar al usuario no root
USER user

# Comando para iniciar la aplicación
CMD [ "npm", "run", "dev" ]

# Exponer los puertos utilizados por el servidor
EXPOSE 5001
