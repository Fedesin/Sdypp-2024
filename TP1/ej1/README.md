# HIT 1

Elabore un código de servidor TCP para B que espere el saludo de A y lo responda. Luego, elabore un código de cliente TCP para A que se conecte con B y lo salude

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

## Funcionalidades

### Servidor (`server.js`)

-   Escucha conexiones entrantes en el puerto `3001`.
-   Repite cualquier mensaje recibido del cliente.
-   Implementa un endpoint `getStatus` para verificar el estado del servidor.

### Cliente (`client.js`)

-   Conecta al servidor que escucha en el puerto `3001`.
-   Espera la entrada del usuario desde la consola y envía los mensajes al servidor.
-   Muestra los mensajes recibidos del servidor en la consola.

## Dependencias

-   Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.
