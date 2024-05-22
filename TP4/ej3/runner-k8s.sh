#!/bin/bash
cd ../Images
echo ""
echo "Iniciando tarea sobel!"
echo "Recuerde copiar y resguardar el TASK_ID para luego obtener el resultado de la operación \n"
echo "Espere unos segundos... \n"
sleep 5


curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image8.jpg" http://34.74.131.137:5000/api/sobel
# curl http://34.74.131.137:5000/api/status
# http://34.74.131.137:5000/api/result/17881dad-3c33-464d-b652-238907f21bba
