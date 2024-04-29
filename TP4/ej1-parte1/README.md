# HIT 1 | Parte 1

El operador de Sobel es una máscara que, aplicada a una imagen, permite detectar (resaltar) bordes. Este operador es una operación matemática que, aplicada a cada pixel y teniendo en cuenta los píxeles que lo rodean, obtiene un nuevo valor (color) para ese pixel. Aplicando la operación a cada píxel, se obtiene una nueva imagen que resalta los bordes

Desarrollar un proceso centralizado que tome una imagen, aplique la máscara, y genere un nuevo archivo con el resultado.

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

4. Utilizar cURL para realizar la petición para filtrar la imagen

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@../Images/Image.jpg" http://localhost:5000/api/sobel --output ../Images/imagen_procesada.png
```
