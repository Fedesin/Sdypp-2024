#!/bin/bash
cd terraform
sh create.sh
cd ..
docker compose up -d
cd ../Images
echo ""
echo "Iniciando tarea sobel. Espere unos segundos"
echo "Recuerde copiar y resguardar el TASK_ID para luego obtener el resultado de la operación \n"
echo ""

sleep 15

curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5001/api/sobel
