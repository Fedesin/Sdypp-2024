from split import split_image
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import io
import os

app = Flask(__name__)

@app.route("/api/split", methods=['POST'])
def split():
    if request.method == 'POST':        
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
                return "Error al procesar la imagen", 400
            
            # Aplica el filtro Sobel a la imagen
            fragments = split_image(image, 2)
            
            # Devuelve la imagen procesada
            # return send_file(imagen_sobel, mimetype='image/png', as_attachment=True)
            return jsonify("parts: 2")
    else:
        return "Método no permitido o imagen no adjunta", 405  # Método no permitido o imagen no adjunta

            # return f"El tiempo total de ejecución fue de {tiempo:.2f} segundos"