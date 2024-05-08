import imghdr
import io
import os
import random

import cv2
import numpy as np
from flask import Flask, jsonify, request, send_file

from sobel_filter import filter_image

app = Flask(__name__)


@app.route("/api/sobel", methods=['GET'])
def status():
    return jsonify({"code": "200", "status": "OK", "description": "Sobel service is working..."})


@app.route("/api/sobel", methods=['POST'])
def sobel():
    if request.method == 'POST':
        # Verifica si hay un archivo adjunto de imagen en la solicitud
        try:

            if 'image' in request.files:
                # Obtén el archivo adjunto de la imagen
                image_file = request.files['image']

                # Lee los datos binarios de la imagen
                image_data = image_file.read()

                # Verifica si el archivo adjunto es realmente una imagen
                image_type = imghdr.what(None, h=image_data)

                if image_type not in ['jpeg', 'png', 'bmp', 'jpg']:
                    return jsonify({'Bad request': 'Formato de imagen no válido. Solo se permiten archivos PNG, JPG o BMP.'}), 400

                # Convierte los datos binarios en una matriz numpy
                nparr = np.frombuffer(image_data, np.uint8)

                # Decodifica la imagen de la matriz numpy
                image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                # Verifica si la imagen se ha cargado correctamente
                if image is None:
                    return jsonify({'Internal server error': 'Ocurrió un error al procesar la imagen'}), 500

                # Aplica el filtro Sobel a la imagen
                imagen_sobel = filter_image(image)

                # Devuelve la imagen procesada
                return send_file(imagen_sobel, mimetype='image/png', as_attachment=True)
        except internal_server_error:
            return jsonify({'Internal server error': 'Ocurrió un error al filtrar la imagen. Reintente en unos momentos.'}), 500
    else:
        return jsonify({'Method not allowed': 'Método no permitido'}), 405


@app.errorhandler(500)
def internal_server_error(error):
    print("Se ha producido un error interno del servidor:", error)
