# HIT 3 | Servicio fragmentador (split service)

Este proceso es el encargado de recibir la imagen original del usuario y fragmentarla en partes más pequeñas. Posteriormente, creará una tarea asociada a cada fragmento
para que, en algún momento, estos sean procesados por los workers sobel.

# Instrucciones para ejecutar el servicio de manera local con docker

1. Iniciar el contenedor

```
docker run -p 5001:5000 -e FRAGMENTS_COUNT=6 -e REDIS_HOST=<HOST> -e REDIS_PORT=<PORT> fedesin31/split-service:latest
```

2. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5001/api/split
```

3. Alternativamente, puede ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen)

```bash
sh runner.sh
```
