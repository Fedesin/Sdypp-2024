import os
import imghdr
import time

import json
import uuid
import cv2
import numpy as np
from flask import Flask, jsonify, request
from utils.split import split_image
from plugins.redis.redis_client import redis_connect


app = Flask(__name__)


@app.route("/api/status", methods=['GET'])
def status():
    return jsonify({"code": "200", "status": "OK", "description": "Split service is working..."})


@app.route("/api/split/<task_id>", methods=['POST'])
def split(task_id):
    if request.method == 'POST':
        num_fragments = os.environ.get('FRAGMENTS_COUNT')
        num_fragments = int(num_fragments)

        if num_fragments < 1 or num_fragments > 20:
            return jsonify({'Bad request': 'El número de fragmentos debe estar entre 1 y 16'}), 400

        try:
            # Verifica si hay un archivo adjunto de imagen en la solicitud
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

                # "fragments" en un array con los paths a los fragmentos de imagen
                fragments = split_image(image, num_fragments)

                subtasks = []

                for fragment in fragments:
                    # TODO: Subir los fragmentos al bucket GCP (no sé que tan viable es esto. En otro caso, buscar alternativas)
                    # TODO: Generar tareas para encolar en el RabbitMQ
                    subtask_id = str(uuid.uuid4())
                    subtask = {
                        "task_id": task_id,
                        "subtask_id": subtask_id,
                        "fragment_name": fragment,
                        "img_url": "http://fragment.com",
                    }

                    subtasks.append(subtask_id)

                # Registro estado inicial de tarea sobel en redis.
                r = redis_connect()

                r.hset(task_id, mapping={
                    "subtasks_count": len(subtasks),
                    "completed_subtasks": 0,
                    "status": "PENDING",
                    "fragments": json.dumps(fragments),
                    "created_at": int(time.time()),
                    "completed_at": 0,
                })

            return jsonify({'OK': 'Imagen fragmentada correctamente'}), 200
        except internal_server_error:
            return jsonify({'Internal server error': 'Ocurrió un error al dividir la imagen. Reintente en unos momentos.'}), 500

    else:
        # Método no permitido o imagen no adjunta
        return jsonify({'Method not allowed': 'Método no permitido'}), 405


@app.errorhandler(500)
def internal_server_error(error):
    print("Se ha producido un error interno del servidor:", error)
