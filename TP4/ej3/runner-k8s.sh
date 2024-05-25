#!/bin/bash
cd ../Images
echo ""
echo "Iniciando tarea sobel!"
echo "Recuerde copiar y resguardar el TASK_ID para luego obtener el resultado de la operación \n"
echo "Espere unos segundos... \n"
sleep 5
current_date_time=$(date +"%Y-%m-%d %H:%M:%S")
echo "Current date and time: $current_date_time"
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image3.jpg" http://35.225.91.133:5000/api/sobel
sleep 15
current_date_time=$(date +"%Y-%m-%d %H:%M:%S")
echo "Current date and time: $current_date_time"
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image4.jpg" http://35.225.91.133:5000/api/sobel
sleep 15
current_date_time=$(date +"%Y-%m-%d %H:%M:%S")
echo "Current date and time: $current_date_time"
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" http://35.225.91.133:5000/api/sobe
sleep 15
current_date_time=$(date +"%Y-%m-%d %H:%M:%S")
echo "Current date and time: $current_date_time"
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image8.jpg" http://35.225.91.133:5000/api/sobel



# curl http://35.184.179.183:5000/api/status
# http://35.202.175.121:5000/api/result/6a083421-1af9-4e48-a383-c7a028ca730e
