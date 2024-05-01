import imghdr
import io
import os
import random

import cv2
import numpy as np
from flask import Flask, request, send_file
from sobel_filter import filter_image

app = Flask(__name__)


@app.route("/api/sobel", methods=['POST'])
def sobel():
    if request.method == 'POST':
        # Verifica si hay un archivo adjunto de imagen en la solicitud
        if 'image' in request.files:
            # Obtén el archivo adjunto de la imagen
            image_file = request.files['image']

            # Lee los datos binarios de la imagen
            image_data = image_file.read()

            # Verifica si el archivo adjunto es realmente una imagen
            image_type = imghdr.what(None, h=image_data)

            if image_type not in ['jpeg', 'png', 'bmp', 'jpg']:
                return "Formato de imagen no válido. Solo se permiten archivos PNG, JPG o BMP.", 400

            # Convierte los datos binarios en una matriz numpy
            nparr = np.frombuffer(image_data, np.uint8)

            # Decodifica la imagen de la matriz numpy
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Verifica si la imagen se ha cargado correctamente
            if image is None:
                return "Error al procesar la imagen", 400

            # Aplica el filtro Sobel a la imagen
            imagen_sobel = filter_image(image)

            # Devuelve la imagen procesada
            return send_file(imagen_sobel, mimetype='image/png', as_attachment=True)
    else:
        return "Método no permitido o imagen no adjunta", 405
