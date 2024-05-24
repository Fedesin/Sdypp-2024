import io
import os

import cv2
import numpy as np
from apply_sobel import sobel
from flask import Flask, jsonify, request, send_file
from image_utils import join_image, split_image

app = Flask(__name__)


class MaxRetriesExceededError(Exception):
    pass


@app.route("/api/sobel", methods=['POST'])
def split():
    if request.method == 'POST':
        # Obtiene de las variables de entorno la cantidad de partes que en que divirá la imagen
        num_fragments = os.environ.get('FRAGMENTS_COUNT')
        num_fragments = int(num_fragments)

        if num_fragments < 1 or num_fragments > 20:
            return "Bad request: el número de fragmentos debe estar entre 1 y 20", 400

        # Verifica si hay un archivo adjunto de imagen en la solicitud
        if 'image' in request.files:
            # Obtén el archivo adjunto de la imagen
            image_file = request.files['image']

            # Lee los datos binarios de la imagen
            image_data = image_file.read()

            # Convierte los datos binarios en una matriz numpy
            nparr = np.frombuffer(image_data, np.uint8)

            # Decodifica la imagen de la matriz numpy
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Verifica si la imagen se ha cargado correctamente
            if image is None:
                return "Bad request: error al procesar la imagen", 400

            # Divide la imagen. "fragments" en un array con los paths a los fragmentos de imagen
            fragments = split_image(image, num_fragments)

            sobel_fragments = []
            try:
                sobel_fragments = sobel(fragments)
            except MaxRetriesExceededError as error:
                # Si se produce un error MaxRetriesExceededError, enviar un código de error 500 al usuario
                return jsonify({'Error': 'Ocurrió un error al procesar la imagen. Reintente en unos momentos.'}), 500

        final_image = join_image(fragments, sobel_fragments)

        # Devuelve la imagen procesada
        return send_file(final_image, mimetype='image/png', as_attachment=True)
    else:
        # Método no permitido o imagen no adjunta
        return "Método no permitido o imagen no adjunta", 405


@app.errorhandler(500)
def internal_server_error(error):
    print("Se ha producido un error interno del servidor:", error)
    return "Ocurrió un error interno del servidor", 500
