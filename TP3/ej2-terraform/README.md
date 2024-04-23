# Configuración de service account para autenticar Terraform con GCP

-   Ver el [siguiente video](https://youtu.be/KilW1B8gxW4?si=EyeC7kTnZO5Otjzr) que explica como crear la service account y obtener las keys en formato `.json`.
-   Copiar el archivo descargado en el directorio raíz y renombrarlo a `credentials.json`
-   Otorgarle permisos de 'Editor' a la service account en la sección de IAM de GCP console.

## Creación de infraestructura

-   Ejecutar terraform para crear la instancia de la VM en GCP.

```bash
terraform init
terraform apply -auto-approve

# Otra alternativa es ejecutar el siguiente script:
sh runner.sh
```

-   Para conectarse por ssh, ejecutamos el siguiente script `ssh-connect.sh`:

```bash
username=$(cat ./temp/username.txt | tr -d '"')
instance_ip=$(cat ./temp/instance_ip.txt | tr -d '"')

ssh -i ./.keys/ssh_private_key.pem ${username}@${instance_ip}
```

Los valores de username, instance_ip y la clave privada son obtenidos del output de terraform.
```
resource "local_file" "ssh_private_key_pem" {
  content         = tls_private_key.keys.private_key_pem
  filename        = ".keys/ssh_private_key.pem"
  file_permission = "0600"
}

resource "local_file" "username" {
  content         = split("@", data.google_client_openid_userinfo.me.email)[0]
  filename        = "temp/username.txt"
  file_permission = "0600"
}


resource "local_file" "instance_ip" {
  content         = google_compute_instance.vm_instance[0].network_interface[0].access_config[0].nat_ip
  filename        = "temp/instance_ip.txt"
  file_permission = "0600"
}
```

## Compare y comente las velocidades de descarga. ¿A qué se debe esta diferencia?

Iniciamos al mismo tiempo la descarga de la ISO de Ubuntu 22 de forma local y en una instancia en GCP. Se puede notar una gran diferencia en la velocidad en la que la descarga se completa.

***Descarga en VM GCP***

![cloud](https://github.com/Fedesin/sdypp-2024/assets/117539520/acf05368-f216-4be2-9685-0bd91ff514b7)

***Descarga local***

![local](https://github.com/Fedesin/sdypp-2024/assets/117539520/837eacd6-38d3-4a59-88a1-f6a455c2d626)


Asumimos que se debe a que la red en la que se encuentra la VM de Google Cloud puede tener un ancho de banda más alto y quizás una menor latencia en comparación con nuestra red local.

Otro factor que puede influir es la ubicación del servidor de origen desde el cual se está descargando la ISO puede tener un impacto en la velocidad de descarga. Si el servidor de origen está más cerca de la infraestructura de Google Cloud que de tu ubicación local, la descarga podría ser más rápida en la VM.

Incluso, los proveedores de servicios en la nube a menudo implementan optimizaciones de red, como la distribución de contenido en caché o la optimización de rutas, que pueden mejorar la velocidad de descarga de los recursos. Estas optimizaciones pueden no estar presentes en tu red local.

## Copiando un archivo a la VM en GCP

Para realizar la prueba de copiar un archivo usamos el comando `scp` dentro del siguiente script:

```
username=$(cat ./temp/username.txt | tr -d '"')
instance_ip=$(cat ./temp/instance_ip.txt | tr -d '"')

# Copiamos este archivo README en la VM en la nube.
scp -i ./.keys/ssh_private_key.pem ./README.md ${username}@${instance_ip}:/home/${username}
```
![scp-local](https://github.com/Fedesin/sdypp-2024/assets/117539520/8229ee14-5767-4649-8b5d-f0cac5320dde)
![scp-remote](https://github.com/Fedesin/sdypp-2024/assets/117539520/4a619b4b-789d-4bf1-96d4-942698fe0083)


Salimos de la vm, presionando 

`Control + D`

Finalmente matamos la vm con el comando:

 `terraform destroy --auto-approve`
