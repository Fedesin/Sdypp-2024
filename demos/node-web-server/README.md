# Node web server demo

## Instrucciones

1. Clonar el .env.template, renombrar a .env y configurar las variables

```
PORT = 3000
```

2. Hacer un build de la imagen de docker

```bash
docker build -t node-web-server .
```

3. Levantar el contenedor

```bash
docker run --name node-web-server -p 8080:3000 node-web-server
```

Ahora, si desde el navegador vas a la URL http://localhost:8080/api/user, deberías ver la siguiente respuesta:

```json
{
	"name": "Usuario 1",
	"email": "asdasd@asdasd.com",
	"age": 23
}
```
