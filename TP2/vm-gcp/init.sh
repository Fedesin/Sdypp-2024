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
