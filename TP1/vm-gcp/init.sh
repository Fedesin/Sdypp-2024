#!/bin/bash

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

# Update package list
sudo apt update

# Update package list
sudo apt update

# Install docker
curl -fsSL https://get.docker.com/ -o get-docker.sh
sudo sh get-docker.sh

# Install Node.js
sudo apt install -y nodejs

# Install npm
sudo apt install -y npm

# Install docker-compose
sudo apt install -y docker-compose

# I want to clone a repository from GitHub
git clone https://github.com/Fedesin/Sdypp-2024.git
cd Sdypp-2024/TP1/


#ejecutamos la imagen del ejercicio 1
docker pull fedesin31/serverej1
docker run -d -p 3001:3001 -p 8081:8081 fedesin31/serverej1


#ejecutamos la imagen del ejercicio 2
docker pull fedesin31/serverej2
docker run -d -p 3002:3002 -p 8082:8082 fedesin31/serverej2


#ejecutamos la imagen del ejercicio 3
docker pull fedesin31/serverej3
docker run -d -p 3003:3003 -p 8083:8083 fedesin31/serverej3

#ejecutamos la imagen del ejercicio 4
cd ej4
docker compose -d 
cd ..

#ejecutamos la imagen del ejercicio 5

cd ej5
docker compose -d 
cd ..


#ejecutamos la imagen del ejercicio 6

cd ej6
docker compose -d 
cd ..

#ejecutamos la imagen del ejercicio 7
cd ej7
docker compose -d 
cd ..

#ejecutamos el service checker
cd service-checker
npm install 
node server.js
cd ..