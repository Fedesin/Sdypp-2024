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

# Instrucciones para interactuar con el servicio corriendo en la nube

1. Ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen). Para este paso es necesario contar con el archivo con las keys (credentials.json) en el directorio raiz del proyecto. También deberá actualizar los valores de variables en el código terraform para adecuarlo a su proyecto GCP

```bash
sh runner-k8s.sh
```

Copie el TASK_ID obtenido como respuesta.

2. Abra el navegador y pegue la siguiente URL `http://34.74.201.251:5000/api/results/<TASK_ID>`, reemplazando el valor de TASK_ID obtenido en el paso anterior. El JSON que muestra como respuesta indica el estado de la tarea. Cuando la tarea esté completa, le mostrará la URL que le permitirá obtener la imagen sobel final

# Instrucciones para ejecutar el servicio de manera local con docker

1. Clonar el archivo .env.example y renombrarlo a .env. Si desea, puede actualizar los valores por defecto

```
# Definir la cantidad de partes en las que se dividirá la imagen
FRAGMENTS_COUNT=4

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

2. Ejecutar el siguiente comando (debe modificar la linea de curl si desea utilizar otra imagen). Para este paso es necesario contar con el archivo con las keys (credentials.json) en el directorio raiz del proyecto. También deberá actualizar los valores de variables en el código terraform para adecuarlo a su proyecto GCP.

```bash
sh runner.sh
```

Copie el TASK_ID obtenido como respuesta.

3. Abra el navegador y pegue la siguiente URL `http://localhost:5001/api/results/<TASK_ID>`, reemplazando el valor de TASK_ID obtenido en el paso anterior. El JSON que muestra como respuesta indica el estado de la tarea. Cuando la tarea esté completa, le mostrará la URL que le permitirá obtener la imagen sobel final.

# Instrucciones para ejecutar el cluster k8s

1. Realizar un commit con el mensage "(up)" para crear la infraestructura con el cluster de Kubernetes y las aplicaciones. Esto disparará la ejecución del pipeline de Kubernetes en Github actions.

2. Luego, de asegurarse de que el pipeline de Kubernetes termine su ejecución (aprox 20 min.), realizar un commit con el mensaje "(workers-up)". Esto disparará la ejecución del pipeline de los workers en Github actions.

3. Una vez que el pipeline de los workers termine su ejecución, ejecutar el siguiente comando para obtener la IP del service para utilizar la aplicación sobel:

```bash
kubectl get services
```

Copiarse la IP externa del servicio `entry-server`

4. Abrir una terminal nueva y ejecutar el siguiente comando, reemplazando la IP del servicio:

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@../Image6.jpg" -w '\nTiempo total: %{time_total}s\n' http://<SERVICE-IP>:5000/api/sobel
```

Copie el TASK_ID obtenido como respuesta.

5. Abra el navegador y pegue la siguiente URL `http://<SERVICE-IP>:5000/api/results/<TASK_ID>`, reemplazando el valor de TASK_ID obtenido en el paso anterior. El JSON que muestra como respuesta indica el estado de la tarea. Cuando la tarea esté completa, le mostrará la URL que le permitirá obtener la imagen sobel final.
