from image_utils import split_image, join_image
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import io
import os

app = Flask(__name__)

@app.route("/api/split/<int:num_fragments>", methods=['POST'])
def sobel(num_fragments):
    if request.method == 'POST':    
        # Verificar que num_fragments esté dentro del rango permitido
        if num_fragments < 1 or num_fragments > 10:
            return "Bad request: el número de fragmentos debe estar entre 1 y 10", 400
            
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
            
            # Aplica el filtro Sobel a la imagen
            fragments = split_image(image, num_fragments)
            join_image(fragments)
            # Devuelve la imagen procesada
            # return send_file(imagen_sobel, mimetype='image/png', as_attachment=True)
            return "Imagen dividida en {} partes".format(num_fragments), 200
    else:
        return "Método no permitido o imagen no adjunta", 405  # Método no permitido o imagen no adjunta

            # return f"El tiempo total de ejecución fue de {tiempo:.2f} segundos"