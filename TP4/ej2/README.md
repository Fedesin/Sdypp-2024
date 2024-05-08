# HIT 2 | Sobel con offloading en la nube

Mismo objetivo de calcular sobel, pero ahora vamos a usar Terraform para construir nodos de trabajo cuando se requiera procesar tareas y eliminarlos al terminar. Recuerde que será necesario:

-   Instalar con #user_data las herramientas necesarias (java, docker, tools, docker).
-   Copiar ejecutable (jar, py, etc) o descargar imagen Docker (hub).
-   Poner a correr la aplicación e integrarse al cluster de trabajo.

El objetivo de este ejercicio es que ustedes puedan construir una arquitectura escalable (tipo 1, inicial) HÍBRIDA. Debe presentar el diagrama de arquitectura y comentar su decisión de desarrollar cada servicio y donde lo “coloca”.

![HIT 2](https://github.com/Fedesin/sdypp-2024/assets/117539520/3d14d998-01c0-4760-8ea7-d15f8f857db0)

### ¿Por qué colocamos los workers en la nube?

El proceso que divide la imagen se ejecutará de forma local y estará a la espera de peticiones de clientes, ya que consideramos que no se requiere un alto costo computacional para fragmentar la imagen. La desventaja de hacerlo de esta manera es que no estará expuesto a internet, por lo tanto, si se quiere aplicar sobel a la imagen estará obligado a levantar el contenedor docker que contiene a esta aplicación.

El procesamiento de imagenes para aplicar el filtro sobel decidimos colocarlo en la nube. De esta manera, podemos contar con una base elástica de workers encargados unicamente de recibir peticiones para aplicar el filtro sobel. La nube proporciona recursos escalables que pueden manejar eficientemente el procesamiento de múltiples fragmentos de imagen. La idea es colocar adelante un load-balancer para que distribuya el tráfico de forma eficiente y la aplicación cliente tenga un único punto de acceso y sea transparente la cantidad de workers que hay activos en todo momento, ya que estos pueden iniciarse o apagarse dependiendo de la carga de trabajo.

Una vez que todos los fragmentos han sido procesados, la fase de unificación de los resultados ocurre también de forma local. El encargado de unificar la imagen es el mismo proceso que en un principio la dividió, por lo cuál, es quien recibirá la respuestas de los workers con los fragmentos sobelizados. Además, este proceso es el que actúa como punto de entrada para la comunicación con el cliente, por lo cuál, es quien entregará el resultado final (imagen original sobelizada). 

# Instrucciones

1. Clonar el archivo .env.example y renombrarlo a .env

```
# Esto es para indicarle la URL del balanceador de cargas
LOAD_BALANCER_URL = <URL_PÚBLICA>

# Definir la cantidad de partes en las que se dividirá la imagen
FRAGMENTS_COUNT = 8
```

3. Iniciar la aplicación de manera local. Los workers estarán desplegados en la nube.

```bash
docker compose up -d
```

4. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/sobel --output imagen_procesada.png
```
