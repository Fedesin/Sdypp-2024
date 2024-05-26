#!/bin/bash
docker compose up -d
cd ..
cd ..
cd Images/
sleep 5
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://localhost:5000/api/sobel --output imagen_procesada.png
