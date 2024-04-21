# HIT 1

Prepare un programa (utilizando Terraform/SDK), que tome de manera segura las credenciales del usuario y permita realizar las siguientes actividades:

-   Crear una instancia
-   Crear N instancias, siendo N un valor que se pasa en tiempo de ejecución.

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
