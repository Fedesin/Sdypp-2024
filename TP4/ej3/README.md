# HIT 3 | Sobel contenerizado asincrónico y escalable

A diferencia del clúster anterior, la idea es que construya una infraestructura basada en la nube pero ahora con un enfoque diferente.

Para ello, será necesario:

1. Desplegar con terraform un cluster de Kubernetes (GKE). Este será el manejador de todos los recursos que vayamos a desplegar. Es decir, va a alojar tanto los servicios de infraestructura (rabbitMQ y Redis) como los componentes de las aplicaciones que vamos a correr (frontend, backend, split, joiner, etc). Este clúster tiene que tener la siguiente configuración mínima:

    - Un nodegroup para alojar los servicios de infraestructura (rabbitmq, redis, otros)
    - Un nodegroup compartido para las aplicaciones del sistema (front, back, split, joiner)
    - Máquinas virtuales (fuera del cluster) que se encarguen de las tareas de procesamiento / cómputo intensivo.

2. Construir los pipelines de despliegue de todos los servicios.

    - Pipeline 1: El que construye el Kubernetes.

        - Pipeline 1.1: El que despliega los servicios (base datos - Redis, sistema de colas - RabbitMQ)
        - Pipeline 1.2-1.N: De cada aplicación desarrollada (frontend, backend, split, join)

    - Pipeline 2: Despliegue de máquinas virtuales para construir los workers. Objetivo deseable: Que estas máquinas sean “dinámicas”.

![Diagramas-# HIT 3 (TP 4)](https://github.com/Fedesin/sdypp-2024/assets/117539520/660a280b-d904-4bf5-b8dc-57966502dfa0)

# Instrucciones para ejecutar el servicio de manera local con docker

1. Clonar el archivo .env.example y renombrarlo a .env. Si desea, puede actualizar los valores por defecto.

```
# Definir la cantidad de partes en las que se dividirá la imagen
FRAGMENTS_COUNT=4

# Puerto donde escucha el servidor redis
REDIS_PORT=6379
# Host donde se encuentra el servidor redis
REDIS_HOST="localhost"

# Endpoint para interactuar con el servicio de split de imágenes
SPLIT_SERVICE_URL=http://split-service:5000/api/split

# Nombre del bucket GCP donde se subirán los fragmentos de imagen
BUCKET_NAME=sobel

# Nombre de usuario y password para usar de credenciales en rabbitmq
RABBITMQ_USER=rabbituser
RABBITMQ_PASSWORD=rabbitpassword
```

2. Crear la infraestructura ejecutando el script `create.sh` dentro de la carpeta `terraform`. Para este paso también es necesario contar con el archivo con las keys (`credentials.json`) en el directorio raiz del proyecto.

```bash
sh create.sh
```

3. Iniciar los contenedores

```
docker compose up -d
```

4. Ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen).

```bash
sh runner.sh
```
