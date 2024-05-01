# HIT 1 | Parte 3

Mejore la aplicación del punto anterior para que, en caso de que un proceso distribuido (al que se le asignó parte de la imagen a procesar - WORKER) se caiga y no responda, el proceso principal detecte esta situación y pida este cálculo a otro proceso.

## Instrucciones (contar con docker instalado)

1. Clonar el archivo .env.example y renombrarlo a .env

```
# Esto es para indicarle la URL del balanceador de cargas
LOAD_BALANCER_URL = http://load-balancer:8080/api/sobel

# Definir la cantidad de partes en las que se dividirá la imagen (probablemente este valor dependa de la cantidad de workers que se inicien)
FRAGMENTS_COUNT = 6
```

2. (opcional) Si desea puede modificar la cantidad de workers (por defecto son 2) sobel que se inician modificando el docker-compose.yml. La idea es pegar el replicar el siguiente bloque tantas veces como desea, reemplanzando <N> por el orden del worker. Es decir, si hay dos workers y desea agregar un tercero, N = 3.

```
sobel-worker-<N>:
    image: fedesin31/tp4-ej1-sobel:latest
    container_name: sobel-worker-<N>
    networks:
        - loadbalancing

nginx:
    build: ../nginx
    ports:
        - '80:80'
    networks:
        - loadbalancing
    depends_on:
        - sobel-worker-1
        - sobel-worker-2
        - sobel-worker-N
```

Luego, actualizar el archivo de configuración de nginx

```
upstream backend {
    server sobel-worker-1:5000;
    server sobel-worker-2:5000;
    server sobel-worker-<N>:5000;
}
```

3. Iniciar los contenedores

```bash
docker compose up -d
```

4. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/sobel --output imagen_procesada.png
```
