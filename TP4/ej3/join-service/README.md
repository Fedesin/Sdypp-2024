# HIT 3 | Servicio unificador (join service)

Este proceso es el encargado de unificar los fragmentos de imagen ya sobelizados para lograr la imagen final que se entregará al usuario.

# Instrucciones para ejecutar el servicio de manera local

1. Clonar el archivo .env.example y renombrarlo a .env

```
...
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

# Instrucciones para ejecutar con docker

1. Iniciar el contenedor

```
docker run -p 5001:5000 fedesin31/join-service:latest
```
