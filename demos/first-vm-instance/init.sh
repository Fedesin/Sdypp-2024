#!/bin/bash

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

# Update package list
sudo apt update

# Install Node.js
sudo apt install -y nodejs

# Install npm
sudo apt install -y npm

# Install nginx 
sudo apt install -y nginx

# I want to clone a repository from GitHub
git clone https://github.com/Fedesin/Sdypp-2024.git
cd Sdypp-2024/demos/node-web-server

# Install node_modules
npm install

# Run the server
npm run start