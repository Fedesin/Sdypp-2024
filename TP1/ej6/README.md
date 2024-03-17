# HIT 6

Cree un programa D, el cual, actuará como un “Registro de contactos”. Para ello, en un array en ram, inicialmente vacío, este nodo D llevará un registro de los programas C que estén en ejecución.

Modifique el programa C de manera tal que reciba por parámetros únicamente la ip y el puerto del programa D. C debe iniciar la escucha en un puerto aleatorio y debe comunicarse con D para informarle su ip y su puerto aleatorio donde está escuchando. D le debe responder con las ips y puertos de los otros nodos C que estén corriendo, haga que C se conecte a cada uno de ellos y envíe el saludo.

Es decir, el objetivo de este HIT es incorporar un nuevo tipo de nodo (D) que actúe como registro de contactos para que al iniciar cada nodo C no tenga que indicar las ips de sus pares. Esto debe funcionar con múltiples instancias de C, no solo con 2.

## Uso

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio.
3. Abrí como mínimo 3 terminales.
4. En la primera terminal, parate en el directorio de la aplicación y ejecuta el servidor de registro:

    ```bash
    node contact-server.js
    ```

5. En la segunda terminal, parate en el directorio de la aplicación y ejecuta un nodo tipo C:

    ```bash
    node server.js
    ```

6. En la tercera terminal, parate en el directorio de la aplicación y ejecuta un segundo nodo tipo C:

    ```bash
    node server.js
    ```

7. Si quiere registrar más de dos nodos C, repita el paso 6 la cantidad de veces que considere.

## Funcionalidades

### Servidor de registro (`contact-server.js`)

-   Escucha conexiones entrantes en el puerto `3006`.
-   Registra a los nodos que se conectan a el
-   Cuando un nodo se registra, le entrega información necesaria para conectarse al resto de nodos que ya se encuentran registrados

### Nodo tipo C (`server.js`)

-   Conecta al servidor de contacto y envía sus parámetros de conexión para registrarse.
-   Una vez recibe la respuesta del servidor de contacto, envía un saludo al resto de nodos registrados.
