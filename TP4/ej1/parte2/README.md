# HIT 1 | Parte 2

Desarrolle este proceso de manera distribuida donde se debe partir la imagen en n pedazos, y asignar la tarea de aplicar la máscara a N procesos distribuidos. Después deberá unificar los resultados.

## Instrucciones

1. Activar el entorno virtual python

```bash
python3 -m venv ./venv
source ./venv/bin/activate
```

2. Instalar las dependencias

```bash
pip install -r requirements.txt
```

3. Ejecutar la aplicación

```bash
flask --app server run
```

4. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/split/<cantidad_partes> --output imagen_procesada.png
```

## Instrucciones para ejecutar con Docker

1. Iniciar los contenedores

```bash
docker compose up -d
```

2. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/sobel --output imagen_procesada.png
```
