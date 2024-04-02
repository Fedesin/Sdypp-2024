# HTTP Server

Este servidor es el encargado de iniciar la ejecución de tareas genéricas.

## Instrucciones de ejecución.

1. Instalar las dependencias.

```bash
npm install
```

2. Configurar las variables de entorno. Para esto copiar el archivo .env.example, renombrarlo a .env y completar los valores de las variables.

```
PORT = 3000
HOST = 0.0.0.0
```

3. Iniciar la aplicación

```bash
npm run dev
```

## Instrucciones de ejecución (Docker)

1. Crear red docker

```bash
docker network create generic-task-network
```

2. Ejecutar el contenedor

```bash
docker run -p 3000:3000 --name server --network generic-task-network -v /var/run/docker.sock:/var/run/docker.sock fedesin31/tp2-http-server
```
