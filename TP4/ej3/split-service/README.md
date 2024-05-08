# HIT 3 | Servicio fragmentador (split service)

Este proceso es el encargado de recibir la imagen original del usuario y fragmentarla en partes más pequeñas. Posteriormente, creará una tarea asociada a cada fragmento
para que, en algún momento, estos sean procesados por los workers sobel.

# Instrucciones para ejecutar el servicio de manera local

1. Clonar el archivo .env.example y renombrarlo a .env

```
# Definir la cantidad de partes en las que se dividirá la imagen
FRAGMENTS_COUNT = 6
```

2. Activar el entorno virtual python

```bash
python3 -m venv ./venv
source ./venv/bin/activate
```

3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

4. Ejecutar la aplicación

```bash
flask --app server run
```

4. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/split
```

5. Alternativamente, puede ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen)

```bash
sh runner.sh
```

# Instrucciones para ejecutar con docker

1. Iniciar el contenedor

```
docker run -p 5001:5000 -e FRAGMENTS_COUNT=6 fedesin31/split-service:latest
```

2. Moverse al directorio `Images` y utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5001/api/split
```

3. Alternativamente, puede ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen)

```bash
sh runner.sh
```