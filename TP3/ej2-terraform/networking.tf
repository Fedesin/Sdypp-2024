resource "google_compute_firewall" "allow_ssh" {
  name          = "allow-ssh"
  network       = "default"
  target_tags   = ["allow-ssh"]
  source_ranges = ["0.0.0.0/0"]

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
}

resource "google_compute_firewall" "allow_http" {
  name          = "allow-http"
  network       = "default"
  target_tags   = ["allow-http"]
  source_ranges = ["0.0.0.0/0"]

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
}

resource "local_file" "instance_ip" {
  content         = google_compute_instance.vm_instance[0].network_interface[0].access_config[0].nat_ip
  filename        = "temp/instance_ip.txt"
  file_permission = "0600"
}
