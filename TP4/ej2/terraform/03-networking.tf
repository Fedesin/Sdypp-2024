# resource "google_compute_firewall" "allow_ssh" {
#   name          = "allow-ssh"
#   network       = "default"
#   target_tags   = ["allow-ssh"]
#   source_ranges = ["0.0.0.0/0"]

#   allow {
#     protocol = "tcp"
#     ports    = ["22"]
#   }
# }

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

# resource "google_compute_firewall" "allow_https" {
#   name          = "allow-https"
#   network       = "default"
#   target_tags   = ["allow-https"]
#   source_ranges = ["0.0.0.0/0"]

#   allow {
#     protocol = "tcp"
#     ports    = ["443"]
#   }
# }

