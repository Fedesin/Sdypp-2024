# pip install opencv-python
# py SobelFilter.py Image.jpg
import cv2
import numpy as np
import argparse
import time
# Registra el tiempo de inicio
tiempo_inicio = time.time()

# Configurar el analizador de argumentos
parser = argparse.ArgumentParser(description='Aplicar filtro Sobel a una imagen.')
parser.add_argument('imagen_path', help='Ruta de la imagen a procesar.')
args = parser.parse_args()

# Cargar la imagen desde la ruta proporcionada
imagen = cv2.imread(args.imagen_path)

# Verificar si la imagen se ha cargado correctamente
if imagen is None:
    print(f"No se pudo cargar la imagen en la ruta: {args.imagen_path}")
    exit()

# Convertir la imagen a escala de grises
imagen_gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)

# Aplicar el filtro de Sobel en la dirección X
sobel_x = cv2.Sobel(imagen_gris, cv2.CV_64F, 1, 0, ksize=5)

# Aplicar el filtro de Sobel en la dirección Y
sobel_y = cv2.Sobel(imagen_gris, cv2.CV_64F, 0, 1, ksize=5)

# Calcular la magnitud de los bordes
magnitud = np.sqrt(sobel_x**2 + sobel_y**2)

# Normalizar la magnitud para escalar los valores a un rango de 0 a 255
magnitud = np.uint8(255 * magnitud / np.max(magnitud))

# Guardar la imagen con los bordes detectados
cv2.imwrite('Imagen_Sobel.png', magnitud)



# Registra el tiempo de finalización
tiempo_fin = time.time()
# Calcula la diferencia de tiempo
tiempo_ejecucion = tiempo_fin - tiempo_inicio

# Imprime el tiempo total de ejecución
print(f"El tiempo total de ejecución fue de {tiempo_ejecucion:.2f} segundos")