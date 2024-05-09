#https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket

resource "google_storage_bucket" "my_bucket" {
  name          = "mi-bucket-de-almacenamiento"  # Reemplaza con el nombre que desees para tu bucket
  location      = "us-central1"  # Reemplaza con la región que desees
  storage_class = "STANDARD"    # Clase de almacenamiento, puedes elegir diferentes opciones

  # Configuración opcional, dependiendo de tus necesidades
  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 1  # Número de días antes de eliminar objetos antiguos
    }
  }
}