#!/bin/bash
cd ../Images
echo ""
echo "Iniciando tarea sobel!"
echo "Recuerde copiar y resguardar el TASK_ID para luego obtener el resultado de la operación \n"
echo "Espere unos segundos... \n"
sleep 5


curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://34.73.254.137:5000/api/sobel
# curl http://34.73.254.137:5000/api/status

