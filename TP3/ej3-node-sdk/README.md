# HIT 3

Cree un mini programa con SDK (python, node, por ejemplo) que liste (terminal) de forma simple y muestre el estado de las instancias (máquinas virtuales) existentes.

[id] instancia id 1 | prendida <br>
[id] instancia id 2 | en pausa <br>
[id] instancia id 3 | terminada <br>

Que permita que una instancia se:

-   Inicie
-   Pause
-   Reinicie
-   Termine (eliminar) su Instancia

## ¿Qué pasa con el estado de terraform si hago terminate?

Revisar estado y explicar qué pasa cuando vuelvo a correr Terraform plan / apply Hacer un dibujo explicativo de lo sucedido.

## Instrucciones de ejecución

1. Instalar dependencias

```
npm install
```

2. Contar con las keys de una service account en formato JSON. En su defecto, crear una y obtener las credenciales en formato .json (ver [docs](https://console.cloud.google.com/iam-admin/serviceaccounts)). Esta key es necesaria para que la aplicación pueda interactuar con la API de GCP.

3. Ejecutar la aplicación. Como parámetro pasar el path al archivo .json del punto anterior.

```
node app.js <path-to-file.json>
```
