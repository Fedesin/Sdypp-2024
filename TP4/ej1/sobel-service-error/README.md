# HIT 1 | Servicio sobel (error aleatorio)

Este servicio sobel, introduce un error al procesar la imagen con una probabilidad de 90%. El propósito del mismo es probar que nuestra aplicación es tolerante a fallos en las peticiones realizadas para sobelizar los fragmentos de imagen.

Haciendo que uno de los workers, levante con esta imagen, casi todas las peticiones que le lleguén lanzarán un error. De esta manera comprobamos si nuestra aplicación es tolerante a fallos.
