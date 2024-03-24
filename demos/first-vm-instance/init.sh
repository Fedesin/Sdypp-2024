#!/bin/bash

# Update package list
sudo apt update

# Install docker
curl -fsSL https://get.docker.com/ -o get-docker.sh
sudo sh get-docker.sh

# I want to clone a repository from GitHub
#git clone https://github.com/Fedesin/Sdypp-2024.git
#cd Sdypp-2024/TP1/

#ejecutamos la imagen del ejercicio 1
docker pull fedesin31/serverej1
docker run -d -p 3001:3001 -p 8081:8081 fedesin31/serverej1


