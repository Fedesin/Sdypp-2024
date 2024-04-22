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

-   Para conectarse por ssh, ejecutamos el siguiente script:

```bash
sh ssh-connect.sh
```

## Compare y comente las velocidades de descarga. ¿A qué se debe esta diferencia?

Iniciamos al mismo tiempo la descarga de la ISO de Ubuntu 22 de forma local y en una instancia en GCP. Se puede notar una gran diferencia en la velocidad en la que la descarga se completa.

Asumimos que se debe a que la red en la que se encuentra la VM de Google Cloud puede tener un ancho de banda más alto y quizás una menor latencia en comparación con nuestra red local.

Otro factor que puede influir es la ubicación del servidor de origen desde el cual se está descargando la ISO puede tener un impacto en la velocidad de descarga. Si el servidor de origen está más cerca de la infraestructura de Google Cloud que de tu ubicación local, la descarga podría ser más rápida en la VM.

Incluso, los proveedores de servicios en la nube a menudo implementan optimizaciones de red, como la distribución de contenido en caché o la optimización de rutas, que pueden mejorar la velocidad de descarga de los recursos. Estas optimizaciones pueden no estar presentes en tu red local.

## Copiando un archivo a la VM en GCP

Para realizar la prueba de copiar un archivo usamos el siguiente comando `scp`

```


```

scp /ruta/local/archivo usuario@direccion_ip_instancia:/ruta/remota/donde/guardar
