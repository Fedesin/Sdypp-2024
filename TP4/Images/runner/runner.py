import requests
import concurrent.futures

# Define la URL y el nombre del archivo de imagen
url = "http://34.172.98.204:5000/api/sobel"
file_name = "../Image6.jpg"

def send_request(url, file_name):
    try:
        # Abre el archivo de imagen en modo binario y envía la petición POST con el archivo adjunto
        with open(file_name, "rb") as file:
            files = {"image": (file_name, file, "multipart/form-data")}
            response = requests.post(url, files=files)
            return response.status_code, response.text
    except Exception as e:
        return 500, str(e)


# Número de peticiones concurrentes que quieres enviar
num_requests = 10

# Usa ThreadPoolExecutor para enviar las peticiones concurrentes
with concurrent.futures.ThreadPoolExecutor(max_workers=num_requests) as executor:
    # Mapea la función `send_request` a cada petición y recupera los resultados
    futures = [executor.submit(send_request, url, file_name)
               for _ in range(num_requests)]
    # Espera a que todas las peticiones se completen y recopila los resultados
    for future in concurrent.futures.as_completed(futures):
        status_code, response_text = future.result()
        print(f"Status Code: {status_code}, Response: {response_text}")
