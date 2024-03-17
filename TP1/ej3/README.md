# HIT 3

Modifique el código de B para que si el proceso A cierra la conexión (por ejemplo matando el proceso) siga funcionando.

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

-   Escucha conexiones entrantes en el puerto `3002`.
-   Espera por saludos de los nodos A. Cuando recibe un saludo, contesta con otro.
-   Si un cliente cierra la conexión, se mantiene a la espera de nuevas conexiones.
-   Implementa un endpoint `/status` para verificar el estado del servidor.

### Cliente (`client.js`)

-   Conecta al servidor que escucha en el puerto `3002`.
-   Envía un saludo al servidor.
-   Si se pierde la conexión con el servidor, espera 10 segundos e intenta reconectarse.

## Dependencias

-   Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.
