import os
import threading
import time

import requests
from image_utils import generate_random_name

MAX_RETRIES = 50  # Número máximo de reintentos


class MaxRetriesExceededError(Exception):
    pass


def process_fragment(fragment, sobel_fragments):
    retries = 0
    while retries < MAX_RETRIES:
        try:
            url = os.environ.get('LOAD_BALANCER_URL')
            response = requests.post(
                url, files={'image': open(fragment, 'rb')})
            random_name = generate_random_name()
            path = os.path.join('tmp', random_name)

            if response.status_code == 200:
                with open(path, "wb") as image:
                    image.write(response.content)
                print(f"Imagen recibida y guardada como {random_name}")
                sobel_fragments[fragment] = {
                    'sobel_fragment_path': path,
                }
                break  # Si el fragmento se procesa correctamente, salir del bucle while
        except Exception as error:
            print("Hubo un problema al procesar la imagen: ", error)
        retries += 1
        time.sleep(1.5)  # Esperar antes de intentar nuevamente

    if retries == MAX_RETRIES:
        raise MaxRetriesExceededError(
            f"Fragment {fragment} couldn't be processed after {MAX_RETRIES} retries")


def sobel(fragments):
    sobel_fragments = {}

    for fragment in fragments:
        sobel_fragment_data = {
            'sobel_fragment_path': "",
        }
        sobel_fragments[fragment] = sobel_fragment_data

    threads = []
    for fragment in fragments:
        thread = threading.Thread(
            target=process_fragment, args=(fragment, sobel_fragments))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    return sobel_fragments
