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

    - Pipeline 2: Despliegue de máquinas virtuales para construir los workers. Objetivo deseable: Que estas máquinas sean “dinámicas”

![Diagramas-# HIT 3 (TP 4)](https://github.com/Fedesin/sdypp-2024/assets/117539520/660a280b-d904-4bf5-b8dc-57966502dfa0)

## Pruebas de performance

Realizamos las siguientes pruebas de performance al procesar imagenes de diferentes tamaños y con cantidad de workers variables. El splitter funciona de forma parametrizada, por lo cuál, en cada ejecución dividió la imagen en 5 partes.

| Prueba | Tamaño de imagen (KB) | Cantidad de workers | Tiempo (segundos) |
| :----: | :-------------------: | :-----------------: | :---------------: |
|   01   |          444          |          5          |        97         |
|   02   |         1.886         |          5          |        92         |
|   03   |         3.688         |          5          |        94         |
|   05   |        10.658         |          5          |        167        |
|   01   |          444          |          3          |        124        |
|   02   |         1.886         |          3          |        200        |
|   03   |         3.688         |          3          |        190        |
|   05   |        10.658         |          3          |        230        |
|   01   |          444          |          1          |        232        |
|   02   |         1.886         |          1          |        235        |
|   03   |         3.688         |          1          |        491        |
|   05   |        10.658         |          1          |        832        |

Por otro lado, se realizaron pruebas de performance modificando la cantidad de peticiones concurrentes que se realizan.

| Prueba | Tamaño de imagen (KB) | Cantidad de peticiones concurrentes | Cantidad de workers | Tiempo promedio (segundos) |
| :----: | :-------------------: | :---------------------------------: | :-----------------: | :------------------------: |
|   01   |         3.688         |                  2                  |          4          |            149             |
|   02   |         3.688         |                  4                  |          4          |           189,5            |
|   03   |         3.688         |                  6                  |          4          |           241,7            |
|   04   |         3.688         |                  8                  |          4          |           385,8            |

# Instrucciones

1. Verificar si el cluster ya está levantado. Para eso, puede ejecuctar el siguiente comando:

```
curl http://34.86.254.48:5000/api/status
```

Debería recibir un status 200, indicando que el entry-server está corriendo.

2. Realizar una petición para iniciar el proceso sobel:

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@../Images/Image6.jpg" http://34.86.254.48:5000/api/sobel
```

Copie el TASK_ID obtenido como respuesta.

2. Abra el navegador y pegue la siguiente URL `http://34.86.254.48:5000/api/result/<TASK_ID>`, reemplazando el valor de TASK_ID obtenido en el paso anterior. El JSON que muestra como respuesta indica el estado de la tarea. Cuando la tarea esté completa, le mostrará la URL que le permitirá obtener la imagen sobel final.

## Instrucciones para desplegar el cluster de Kubernetes

1. Realizar un commit con el mensage "(up)" para crear la infraestructura con el cluster de Kubernetes y las aplicaciones. Esto disparará la ejecución del pipeline de Kubernetes en Github actions.

2. Luego, de asegurarse de que el pipeline de Kubernetes termine su ejecución (aprox 15 min.) y ejecutar el siguiente comando para obtener las credenciales para poder acceder al cluster:

```bash
gcloud container clusters get-credentials primary --region=us-east4-a
```

3.  Luego, ejecutar el siguiente comando para obtener la IP del service para utilizar la aplicación sobel:

```bash
kubectl get services -n applications-namespace
```

Copiarse la IP externa del servicio `entry-server`

3. Abrir una terminal nueva y ejecutar el siguiente comando, reemplazando la IP del servicio:

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@../Image6.jpg" http://<ENTRY_SERVER_SERVICE_IP>:5000/api/sobel
```

Copie el TASK_ID obtenido como respuesta.

4. Abra el navegador y pegue la siguiente URL `http://<ENTRY_SERVER_SERVICE_IP>:5000/api/results/<TASK_ID>`, reemplazando el valor de TASK_ID obtenido en el paso anterior. El JSON que muestra como respuesta indica el estado de la tarea. Cuando la tarea esté completa, le mostrará la URL que le permitirá obtener la imagen sobel final.

## Instrucciones para ejecutar el servicio de manera local con docker (Requiere el bucket "sobel" para las imagenes en la nube)

1. Clonar el archivo .env.example y renombrarlo a .env. Si desea, puede actualizar los valores por defecto

```
# Definir la cantidad de partes en las que se dividirá la imagen
FRAGMENTS_COUNT=3

# Host y puerto donde escucha el servidor redis
REDIS_PORT=6379
REDIS_HOST=redis

# Endpoint para interactuar con el servicio de split de imágenes
SPLIT_SERVICE_URL=http://split-service:5000/api/split

# Nombre del bucket GCP donde se subirán los fragmentos de imagen
BUCKET_NAME=sobel

# Host donde se está ejecutando rabbit
RABBITMQ_HOST=rabbit
# Nombre de usuario y password para usar de credenciales en rabbitmq
RABBITMQ_USER=rabbituser
RABBITMQ_PASSWORD=rabbitpassword
```

2. Iniciar los contenedores y la red docker. Para este paso es necesario contar con el archivo con las keys (credentials.json) en el directorio raiz del proyecto.

```bash
docker compose up -d
```
