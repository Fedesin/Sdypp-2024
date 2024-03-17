#!/bin/bash

# Update package list
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# I want to clone a repository from GitHub
git clone https://github.com/Fedesin/Sdypp-2024.git
cd Sdypp-2024/demos/node-web-server

# Run the server with docker
docker build -t node-web-server .
docker run --name node-web-server -p 3000:3000 -d node-web-server
