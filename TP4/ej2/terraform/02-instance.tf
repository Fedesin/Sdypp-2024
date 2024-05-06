
data "google_client_openid_userinfo" "me" {}

# Template creation
resource "google_compute_instance_template" "sobel-worker-template" {
  name_prefix          = var.prefix
  description          = var.desc
  project              = var.project
  region               = var.region
  tags                 = ["${var.tags}"]
  instance_description = var.desc_inst
  machine_type         = var.machine_type
  can_ip_forward       = false

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
  }

  // Create a new boot disk from an image (Lets use one created by Packer)
  disk {
    source_image = var.source_image
    auto_delete  = true
    boot         = true
  }

  network_interface {
    network = var.network
    #
    # Give a Public IP to instance(s)
    # access_config {
    #   // Ephemeral IP
    # }
  }

  service_account {
    scopes = ["userinfo-email", "compute-ro", "storage-ro"]
  }

  lifecycle {
    create_before_destroy = true
  }

  metadata_startup_script = file(var.metadata_startup_script)

  # Configuración metadata para ssh key
  # metadata = {
  #   ssh-keys = "${split("@", data.google_client_openid_userinfo.me.email)[0]}:${tls_private_key.keys.public_key_openssh}"
  # }
}
