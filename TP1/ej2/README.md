# HIT 2

Revise el código de A para implementar una funcionalidad que permita la reconexión y el envío del saludo nuevamente en caso de que el proceso B cierre la conexión, como por ejemplo, al ser terminado abruptamente.

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

## Utilidades

Esta subido el servidor a docker hub. Se lo puede obtener y ejecutar con los siguientes comando

```bash
docker pull fedesin31/serverej2
docker run -d -p 3002:3002 -p 8082:8082 fedesin31/serverej2
```

La imagen ya se encuentra actualizada con solo pushear el codigo

### Servidor (`server.js`)

-   Escucha conexiones entrantes en el puerto `3002`.
-   Espera por saludos de los nodos A. Cuando recibe un saludo, contesta con otro.
-   Implementa un endpoint `/status` para verificar el estado del servidor.

### Cliente (`client.js`)

-   Conecta al servidor que escucha en el puerto `3002`.
-   Envía un saludo al servidor.
-   Si se pierde la conexión con el servidor, espera 10 segundos e intenta reconectarse.

## Dependencias

-   Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.
