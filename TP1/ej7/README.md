# HIT 7

Modifique el programa C y D, de manera tal de implementar un “sistema de inscripciones”, esto es, se define una ventana de tiempo fija de 1 MIN, coordinada por D, y los nodos C deben registrarse para participar de esa ventana, cuando un nodo C se registra a las 11:28:34 en D, el registro se hace efectivo para la próxima ventana de tiempo que corresponde a las 11:29. Cuando se alcanza las 11:29:00 el nodo D cierra las inscripciones y todo nodo C que se registre será anotado para la ventana de las 11:30, los nodos C que consulten las inscripciones activas solo pueden ver las inscripciones de la ventana actual, es decir, los nodos C no saben a priori cuales son sus pares para la próxima ventana de tiempo, solo saben los que están activos actualmente.

Para simplificar el problema, imagine que D lleva dos registros, un listado de los nodos C activos en la ventana actual, y un registro de nodos C registrados para la siguiente ventana. Cada 60 segundos el nodo D mueve los registros de las inscripciones futuras a la presente y comienza a inscribir para la siguiente ronda.

Recuerde almacenar las inscripciones en un archivo de texto con formato JSON. Esto facilitará el seguimiento ordenado de las ejecuciones y asegurará la verificación de los resultados esperados.

## Uso

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio.
3. Abrí como mínimo 3 terminales
4. En la primera terminal, parate en el directorio de la aplicación y ejecuta el servidor de registro:

    ```bash
    node contact-server.js
    ```

5. En la segunda terminal, parate en el directorio de la aplicación y ejecuta un nodo tipo C:

    ```bash
    node client-server.js localhost 3007 8007
    ```

6. En la tercera terminal, parate en el directorio de la aplicación y ejecuta un segundo nodo tipo C:

    ```bash
    node client-server.js localhost 3007 8070
    ```

7. Si quiere registrar más de dos nodos C, repita el paso 6 la cantidad de veces que considere.

## Utilidades

Para obtener la imagen docker ingrese lo siguiente:

-   Con el siguiente comando podemos ejecutar los contenedores

```bash
docker compose up
```

### Servidor de registro (`contact-server.js`)

-   Escucha conexiones entrantes en el puerto `3007`.
-   Lleva un registro de los nodos conectados a él utilizando ventanas de tiempo.
-   Cuando un nodo se registra, le entrega información necesaria para conectarse al resto de nodos que ya se encuentran registrados
-   Implementa un endpoint `/status` para verificar el estado del servidor.

### Nodo tipo C (`server.js`)

-   Conecta al servidor de contacto y envía sus parámetros de conexión para registrarse.
-   Una vez recibe la respuesta del servidor de contacto, envía un saludo al resto de nodos registrados.
