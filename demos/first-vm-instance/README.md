# Documentación

## Objetivo: Crear VM en GCP y poner a correr web-server en puerto 3000

### 1. Script de inicialización de la instancia en GCP.

```bash
# Variables
USERNAME="johndoe"
REGION=us-east1
ZONE=us-east1-b

# Cree una regla de firewall para permitir el tráfico en el puerto 80 (HTTP) / 22 (SSH) / 3000 (nodo-servidor web)

gcloud compute firewall-rules create allow-http --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:80 --source-ranges=0.0.0.0/0
gcloud compute firewall-rules create allow-ssh --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:22 --source-ranges=0.0.0.0/0
gcloud compute firewall-rules create allow-3000 --action=ALLOW --rules=tcp:3000 --source-ranges=0.0.0.0/0

# Crea una direccion IP publica

gcloud compute addresses create instance-public-ip --region=$REGION

# Genera un par de claves SSH

ssh-keygen -t rsa -b 4096 -C "${USERNAME}@example.com" -f ./keys/id_rsa_example -q -N ""

# Agrega nuestra clave publica a la metadata del proyecto GCP

gcloud compute project-info add-metadata --metadata "ssh-keys=${USERNAME}:$(cat ./keys/id_rsa_example.pub)"

# Crea la instancia en GCP

gcloud compute instances create web-server \
 --zone="$ZONE" \
    --machine-type=e2-micro \
    --preemptible \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --tags=http-server \
    --metadata="ssh-keys=$USERNAME:$(cat ./keys/id_rsa_example.pub)" \
 --metadata-from-file user-data=./init.sh \
 --address=instance-public-ip

# El siguiente comando es el que elimina la instancia GCP

gcloud compute instances delete web-server --zone=us-east1-b

# El siguiente comando nos permite conectarnos mediante SSH a la VM.

ssh -i .keys/id_rsa_example johndoe@<IP_PUBLICA_VM>
```

### 2. Script que se ejecuta al iniciar la VM

```bash
#!/bin/bash

# Esto porque estaba instalando una versión vieja de node y no dejaba ejecutar
#  nuestro web server node.js
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm

# Instalamos nginx para probar si se levanta en el puerto 80
sudo apt install -y nginx

# Clonamos el repositorio donde esta el codigo del web server
git clone https://github.com/Fedesin/Sdypp-2024.git

# Nos movemos al directorio del proyecto
cd Sdypp-2024/demos/node-web-server
# Install node_modules
npm install
# Run the server
npm run start
```
