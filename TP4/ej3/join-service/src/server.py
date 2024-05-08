import io
import os

import cv2
import numpy as np
from apply_sobel import sobel
from flask import Flask, jsonify, request, send_file
from image_utils import join_image, split_image

app = Flask(__name__)


@app.route("/api/status", methods=['GET'])
def status():
    return jsonify({"code": "200", "status": "OK", "description": "Join service is working..."})


@app.route("/api/join", methods=['POST'])
def split():
    if request.method == 'POST':
        # num_fragments = os.environ.get('FRAGMENTS_COUNT')
        print("Joining image...")
    else:
        return jsonify({'Method not allowed': 'Método no permitido'}), 405


@app.errorhandler(500)
def internal_server_error(error):
    print("Se ha producido un error interno del servidor:", error)
    return "Ocurrió un error interno del servidor", 500
