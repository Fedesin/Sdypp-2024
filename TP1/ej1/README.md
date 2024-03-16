# Cliente-Servidor TCP en Node.js

Este es un simple programa cliente-servidor en Node.js que utiliza sockets TCP para la comunicación. El servidor recibe un mensaje del cliente y lo repite de vuelta al cliente.

## Uso

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio o descarga los archivos `server.js` y `client.js`.
3. Abre dos terminales.
4. En la primera terminal, navega hasta la ubicación de los archivos y ejecuta el servidor:

    ```bash
    node server.js
    ```

5. En la segunda terminal, navega hasta la ubicación de los archivos y ejecuta el cliente:

    ```bash
    node client.js
    ```

6. Sigue las instrucciones en la consola del cliente para enviar mensajes al servidor.

## Funcionalidades

### Servidor (`server.js`)

- Escucha conexiones entrantes en el puerto `3000`.
- Repite cualquier mensaje recibido del cliente.
- Implementa un endpoint `getStatus` para verificar el estado del servidor.

### Cliente (`client.js`)

- Conecta al servidor en el puerto `3000` en `localhost`.
- Espera la entrada del usuario desde la consola y envía los mensajes al servidor.
- Verifica el estado del servidor antes de enviar un mensaje. Si el servidor está apagado, muestra un mensaje en la consola.
- Muestra los mensajes recibidos del servidor en la consola.

## Dependencias

- Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.

## Notas

- Asegúrate de tener los puertos necesarios abiertos en tu firewall para permitir la comunicación.
