# HIT 2 | Sobel con offloading en la nube

Mismo objetivo de calcular sobel, pero ahora vamos a usar Terraform para construir nodos de trabajo cuando se requiera procesar tareas y eliminarlos al terminar. Recuerde que será necesario:

-   Instalar con #user_data las herramientas necesarias (java, docker, tools, docker).
-   Copiar ejecutable (jar, py, etc) o descargar imagen Docker (hub).
-   Poner a correr la aplicación e integrarse al cluster de trabajo.

El objetivo de este ejercicio es que ustedes puedan construir una arquitectura escalable (tipo 1, inicial) HÍBRIDA. Debe presentar el diagrama de arquitectura y comentar su decisión de desarrollar cada servicio y donde lo “coloca”.

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
