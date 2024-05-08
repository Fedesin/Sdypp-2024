# HIT 3 | Servicio sobel

El operador de Sobel es una máscara que, aplicada a una imagen, permite detectar (resaltar) bordes. Este operador es una operación matemática que, aplicada a cada pixel y teniendo en cuenta los píxeles que lo rodean, obtiene un nuevo valor (color) para ese pixel. Aplicando la operación a cada píxel, se obtiene una nueva imagen que resalta los bordes

Desarrollar un proceso centralizado que tome una imagen, aplique la máscara, y genere un nuevo archivo con el resultado.

# Instrucciones para ejecutar el servicio de manera local

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
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/sobel --output imagen_procesada.png
```

# Instrucciones para ejecutar con docker

1. Iniciar el contenedor

```
docker run -p 5001:5000 fedesin31/sobel-service:latest
```

2. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5001/api/sobel --output imagen_procesada.png
```
