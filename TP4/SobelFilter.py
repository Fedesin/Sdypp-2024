import cv2
import numpy as np

# pip install opencv-python

# Cargar la imagen
imagen = cv2.imread('Image.jpg')

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
cv2.imwrite('Imagen_Sobel.jpg', magnitud)

# Mostrar la imagen original, la magnitud de Sobel, y las imágenes de Sobel X e Y
#cv2.imshow('Imagen Original', imagen)
#cv2.imshow('Magnitud Sobel', magnitud)
#cv2.imshow('Sobel X', sobel_x)
#cv2.imshow('Sobel Y', sobel_y)

# Esperar a que el usuario presione una tecla para cerrar las ventanas
#cv2.waitKey(0)

# Cerrar todas las ventanas de OpenCV
#cv2.destroyAllWindows()