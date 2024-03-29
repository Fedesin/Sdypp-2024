# HIT 5

Modifique el programa C de manera tal que los mensajes se envíen en formato JSON, serializar y deserializar los mismos al enviar/recibir.

## Uso

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio.
3. Abre dos terminales
4. En la primera terminal, navega hasta la ubicación de los archivos y ejecuta el primer nodo C:

    ```bash
    node client-server.js localhost 3005 localhost 3050 8085
    ```

5. En la segunda terminal, navega hasta la ubicación de los archivos y ejecuta el segundo nodo C:

    ```bash
    node client-server.js localhost 3050 localhost 3005 8005
    ```

## Utilidades

-   Con el siguiente comando podemos ejecutar los contenedores

```bash
docker compose up
```

### Servidor (`client-server.js`)

-   Escucha conexiones entrantes en la IP + PUERTO indicado para recibir saludos.
-   Se conecta a la IP + PUERTO indicados y envía saludo en formato JSON.
-   Espera por saludos de los nodos A. Cuando recibe un saludo, contesta con otro.
-   Si un cliente cierra la conexión, se mantiene a la espera de nuevas conexiones.
-   Implementa un endpoint `/status` para verificar el estado del servidor.

## Dependencias

-   Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.
