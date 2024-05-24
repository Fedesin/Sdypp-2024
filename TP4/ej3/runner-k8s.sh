#!/bin/bash
cd ../Images
echo ""
echo "Iniciando tarea sobel!"
echo "Recuerde copiar y resguardar el TASK_ID para luego obtener el resultado de la operación \n"
echo "Espere unos segundos... \n"
sleep 5


curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image7.jpg" http://34.66.200.65:5000/api/sobel
# curl http://35.184.179.183:5000/api/status
# http://35.202.175.121:5000/api/result/6a083421-1af9-4e48-a383-c7a028ca730e
