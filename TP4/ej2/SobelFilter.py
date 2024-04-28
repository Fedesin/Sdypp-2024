from concurrent.futures import ProcessPoolExecutor
from PIL import Image
import numpy as np
from scipy import ndimage
import time
import sys  # Importa el módulo sys

def aplicar_filtro_sobel(parte):
    # Convertir la parte a una matriz NumPy
    parte_np = np.array(parte)
    
    # Convertir a escala de grises si es necesario
    if len(parte_np.shape) == 3:
        parte_np = np.dot(parte_np[..., :3], [0.2989, 0.5870, 0.1140])
    
    # Aplicar los filtros Sobel
    sobel_x = ndimage.sobel(parte_np, axis=1)  # Sobel en la dirección X
    sobel_y = ndimage.sobel(parte_np, axis=0)  # Sobel en la dirección Y
    
    # Calcular la magnitud combinada de Sobel
    sobel_magnitud = np.sqrt(sobel_x ** 2 + sobel_y ** 2)
    
    # Normalizar la imagen resultante a escala de grises (0-255)
    sobel_magnitud = (sobel_magnitud / sobel_magnitud.max() * 255).astype(np.uint8)
    
    # Convertir la matriz NumPy de vuelta a imagen PIL
    parte_filtrada = Image.fromarray(sobel_magnitud, mode='L')
    
    return parte_filtrada

def dividir_imagen(imagen, num_partes):
    # Dividir la imagen en partes
    ancho, alto = imagen.size
    partes = []
    
    # Dividir verticalmente
    parte_alto = alto // num_partes
    for i in range(num_partes):
        parte = imagen.crop((0, i * parte_alto, ancho, (i + 1) * parte_alto))
        partes.append(parte)
    
    return partes

def unir_partes_imagen(partes):
    # Unir las partes de la imagen para obtener la imagen final
    ancho_total = partes[0].width
    alto_total = sum(parte.height for parte in partes)
    
    # Crear una nueva imagen vacía para la imagen final
    imagen_final = Image.new('L', (ancho_total, alto_total))
    
    # Pegar cada parte en la imagen final
    offset_y = 0
    for parte in partes:
        imagen_final.paste(parte, (0, offset_y))
        offset_y += parte.height
    
    return imagen_final

if __name__ == '__main__':
    # Importa el módulo sys
    import sys

    # Verifica si se ha pasado un argumento de línea de comandos
    if len(sys.argv) < 2:
        print("Por favor, proporciona la ruta de la imagen como argumento.")
        sys.exit(1)

    # Ruta de la imagen proporcionada como argumento
    ruta_imagen = sys.argv[1]

    # Registra el tiempo de inicio
    tiempo_inicio = time.time()

    # Cargar la imagen
    imagen = Image.open(ruta_imagen)
    
    # Dividir la imagen en 4 partes (puedes ajustar el número de partes)
    num_partes = 4
    partes_imagen = dividir_imagen(imagen, num_partes)
    
    # Usar ProcessPoolExecutor para procesar cada parte de la imagen en paralelo
    with ProcessPoolExecutor() as executor:
        partes_filtradas = list(executor.map(aplicar_filtro_sobel, partes_imagen))
    
    # Unir las partes filtradas para obtener la imagen final
    imagen_final = unir_partes_imagen(partes_filtradas)
    
    # Guardar la imagen final
    imagen_final.save('Image_filtrada.png')

    # Registra el tiempo de finalización
    tiempo_fin = time.time()
    # Calcula la diferencia de tiempo
    tiempo_ejecucion = tiempo_fin - tiempo_inicio

    # Imprime el tiempo total de ejecución
    print(f"El tiempo total de ejecución fue de {tiempo_ejecucion:.2f} segundos")