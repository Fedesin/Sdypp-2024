import uuid
import cv2
import os
import numpy as np

def generate_random_name(length=8):
    random_name = str(uuid.uuid4()) + '.png'
    return random_name

def split_image(image, fragments_count):
    width, height, _ = image.shape
    fragments = []
    
    if not os.path.exists('tmp'):
        os.makedirs('tmp')

    # Dividir verticalmente
    fragment_width = height // fragments_count
    for i in range(fragments_count):
        fragment = image[i * fragment_width: (i + 1) * fragment_width, :]
        random_name = generate_random_name()
        path = os.path.join('tmp', random_name)
        cv2.imwrite(path, fragment)
        fragments.append(path)
    
    return fragments

def join_image(fragments):
    # Cargar los fragmentos de imagen
    fragment_images = [cv2.imread(fragment) for fragment in fragments]

    # Obtener el tamaño de la primera imagen para crear la imagen final
    height, width, channels = fragment_images[0].shape
    num_fragments = len(fragment_images)

    # Crear una imagen vacía para unir los fragmentos
    joined_image = np.zeros((height * num_fragments, width, channels), dtype=np.uint8)

    # Concatenar los fragmentos en la imagen final
    for i in range(num_fragments):
        fragment = fragment_images[i]
        joined_image[i*height : (i+1)*height, :] = fragment

    # path = os.path.join('tmp', random_name)
    cv2.imwrite("tmp/final_image.png", joined_image)
        
    