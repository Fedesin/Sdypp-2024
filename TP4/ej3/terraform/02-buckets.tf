resource "google_storage_bucket" "bucket" {
  name          = var.bucket_name  # Reemplaza con el nombre que desees para tu bucket
  location      = var.region  # Reemplaza con la región que desees
  storage_class = "STANDARD"    # Clase de almacenamiento, puedes elegir diferentes opciones
  force_destroy = true

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