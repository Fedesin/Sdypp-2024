# Variables
USERNAME="sdyppg1"
REGION=us-east1
ZONE=us-east1-b

#* Create a firewall rule to allow traffic on port 80 (HTTP) / 22 (SSH) / 3000 (node-web-server) 
gcloud compute firewall-rules create allow-http --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:80 --source-ranges=0.0.0.0/0
gcloud compute firewall-rules create allow-ssh --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:22 --source-ranges=0.0.0.0/0
gcloud compute firewall-rules create allow-3000 --action=ALLOW --rules=tcp:3000 --source-ranges=0.0.0.0/0

#* Create a public IP address
gcloud compute addresses create instance-public-ip --region=$REGION

#* Generate an SSH key pair
# -f ./id_rsa_example: Specifies the output file name and location (./ represents the current directory).
# -q: Suppresses the key generation progress and non-error messages.
# -N "": Specifies an empty passphrase for the key pair.
ssh-keygen -t rsa -b 4096 -C "${USERNAME}@example.com" -f ./keys/id_rsa_example -q -N ""

# Add the public key to the project's metadata
gcloud compute project-info add-metadata --metadata "ssh-keys=${USERNAME}:$(cat ./keys/id_rsa_example.pub)"

#* Creates the VM instance
#--metadata-from-file user-data=./init.sh \ este script ejecuta los comandos al iniciar la maquina de instalar los paquetes.
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

#! Delete the VM instance
# gcloud compute instances delete web-server --zone=us-east1-b
