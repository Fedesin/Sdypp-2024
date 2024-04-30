# Documentación de creación de VM

## Objetivo: Crear VM en GCP y poder ejecutar el servidor para tareas genéricas del TP 2

Ejecutamos el script `runner.sh` para iniciar la VM en la nube.

```bash
sh runner.sh
```

Como resultado, se inicia la máquina virtual de GCP con el nombre **tp2**

Al iniciarse la instancia, se ejecuta el script init.sh para iniciar cada uno de los contenedores.

### El siguiente comando nos permite conectarnos mediante SSH a la VM.

```bash
ssh -i keys/id_rsa_example sdyppg1@35.227.40.69
```

### Para matar la vm de gcloud usamos el siguiente comando

```bash
gcloud compute instances delete tp2 --zone=us-east1-b
```
