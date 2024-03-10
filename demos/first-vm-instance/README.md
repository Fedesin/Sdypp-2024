# Documentación
Creamos la carpeta con mkdir de keys, luego
ejecutamos el siguiente comando con los valores correspondientes al usuario 
ssh-keygen -t rsa -b 4096 -C "${USERNAME}@example.com" -f ./keys/id_rsa_example -q -N ""
Luego tiramos el siguiente comando para actualizar la vm de gcloud
gcloud compute project-info add-metadata --metadata "ssh-keys=${USERNAME}:$(cat ./keys/id_rsa_example.pub)"
una vez realizado esto ya podriamos crear la maquina y ejecutar
los comandos con el script init.sh o ingresar via ssh y descargar los paquetes manualmente
el comando ssh para ingresar a la vm es el siguiente con los datos correspondientes.
ssh -i ./keys/id_rsa_example sdyppg1@35.227.40.69
