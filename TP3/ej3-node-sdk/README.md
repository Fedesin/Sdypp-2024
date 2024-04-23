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

<hr>

### ¿Qué pasa con el estado de terraform si hago terminate? Revisar estado y explicar qué pasa cuando vuelvo a correr Terraform plan / apply Hacer un dibujo explicativo de lo sucedido.

El estado de Terraform se actualizará automáticamente siempre y cuando se creen, eliminen o modifiquen recursos a través de Terraform.

Si creamos una instancia de máquina virtual en la nube, el estado reflejará esos cambios. En caso de que la instancia la eliminemos desde esta aplicación que utiliza el SDK de GCP, el estado de Terraform no notará esos cambios que ocurrieron en los recursos en la nube.

Algo así debería estar el estado de Terraform cuando no hay recursos siendo utilizados en la nube.

```
{
  "version": 4,
  "terraform_version": "1.8.1",
  "serial": 271,
  "lineage": "23d6d6db-b694-f13f-f620-8e3242b5bb93",
  "outputs": {},
  "resources": [],
  "check_results": null
}
```

Sin embargo, al eliminar la instancia por fuera de Terraform, el contenido del archivo `terraform.tfstate` sigue igual que cuando iniciamos la VM, como si no hubiesen ocurrido cambios en la nube.

Cuando volvemos a ejecutar un `terraform plan` consulta el estado actual de la nube para ver que acciones debe llevar a cabo para lograr la infraestructura deseada, por lo cuál, detecta que debe crear el recurso (vm-instance) ya que no existe más. En este paso, Terraform no actualiza el estado `terraform.tfstate`.

Al ejecutar `terraform apply`, comienza la creación de todos los recursos indicados en la configuración de la infraestructura. Ahora sí, al finalizar el proceso, Terraform vuelve a actualizar su estado para reflejar el estado actual de la infraestructura luego de los cambios realizados.

Por último, se ejecuta un `terraform destroy` para destruir los recursos en la nube. En este momento, Terraform vuelve a actualizar su estado el cuál ahora luce algo así.

```
{
  "version": 4,
  "terraform_version": "1.8.1",
  "serial": 311,
  "lineage": "23d6d6db-b694-f13f-f620-8e3242b5bb93",
  "outputs": {},
  "resources": [],
  "check_results": null
}
```
