#!/bin/bash

# Install docker
curl -fsSL https://get.docker.com/ -o get-docker.sh
sudo sh get-docker.sh

docker network create generic-task-network

docker run -p 3000:3000 --name http-server --network generic-task-network -v /var/run/docker.sock:/var/run/docker.sock fedesin31/tp2-http-server
