# HIT 4

Refactoriza el código de los programas A y B en un único programa, que funcione simultáneamente como cliente y servidor. Esto significa que al iniciar el programa C, se le deben proporcionar por parámetros la dirección IP y el puerto para escuchar saludos así como la dirección IP y el puerto de otro nodo C. De esta manera, al tener dos instancias de C en ejecución, cada una configurada con los parámetros del otro, ambas se saludan mutuamente a través de cada canal de comunicación.

## Uso

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio.
3. Abre dos terminales.
4. En la primera terminal, navega hasta la ubicación de los archivos y ejecuta el primer nodo C:

    ```bash
    node client-server.js localhost 3004 localhost 3040 8084
    ```

5. En la segunda terminal, navega hasta la ubicación de los archivos y ejecuta el segundo nodo C:

    ```bash
    node client-server.js localhost 3040 localhost 3004 8040
    ```

## Utilidades

-   Con el siguiente comando podemos ejecutar los contenedores

```bash
docker compose up
```

### Servidor (`client-server.js`)

-   Escucha conexiones entrantes en la IP + PUERTO indicado para recibir saludos.
-   Se conecta a la IP + PUERTO indicados y envía saludo.
-   Espera por saludos de los nodos A. Cuando recibe un saludo, contesta con otro.
-   Si un cliente cierra la conexión, se mantiene a la espera de nuevas conexiones.
-   Implementa un endpoint `/status` para verificar el estado del servidor.

## Dependencias

-   Este programa no utiliza dependencias externas aparte de las librerías estándar de Node.js.
