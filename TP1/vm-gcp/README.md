# Documentación

## Objetivo: Crear VM en GCP y poder ejecutar todos los ejercicios del TP1

Ejecutamos el comando

sh runner.sh

que dentro va a configurar toda la maquina virtual de gcp con el nombre TP1 

y dentro del runner.sh va a correr los comandos especificados en init.sh

# El siguiente comando nos permite conectarnos mediante SSH a la VM.
``` ssh -i .keys/id_rsa_example sdyppg1@<IP_PUBLICA_VM> ```
ssh -i keys/id_rsa_example sdyppg1@35.227.40.69
## Para matar la vm de gcloud usamos el siguiente comando
gcloud compute instances delete tp1 --zone=us-east1-b