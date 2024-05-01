import requests
import os
import threading
from image_utils import generate_random_name

def process_fragment(fragment, sobel_fragments):
    try:
        status = sobel_fragments[fragment]["status"]
        if status != "OK":
            url = os.environ.get('LOAD_BALANCER_URL') 
            response = requests.post(url, files={'image': open(fragment, 'rb')})
            random_name = generate_random_name()
            path = os.path.join('tmp', random_name)
                
            if response.status_code == 200:
                with open(path, "wb") as image:
                    image.write(response.content)
                print(f"Imagen recibida y guardada como {random_name}")
                sobel_fragments[fragment] = {
                    'sobel_fragment_path': path,
                    'status': "OK"
                }   
            else:
                print("Hubo un problema al obtener la imagen: ", response.status_code)
    except Exception as error:
        print("Hubo un problema al procesar la imagen: ", error)

def sobel(fragments):
    sobel_fragments = {}
    
    for fragment in fragments:
        sobel_fragment_data = {
            'sobel_fragment_path': "",
            'status': "PENDING"
        }
        sobel_fragments[fragment] = sobel_fragment_data
    
    threads = []
    for fragment in fragments:
        thread = threading.Thread(target=process_fragment, args=(fragment, sobel_fragments))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    return sobel_fragments
