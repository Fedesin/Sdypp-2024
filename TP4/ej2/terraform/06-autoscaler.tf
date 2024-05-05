# Regional MIG AutoScaler
resource "google_compute_region_autoscaler" "cras" {

  name   = "autoscaler"
  region = var.region
  target = google_compute_region_instance_group_manager.rmig.self_link

  autoscaling_policy {
    max_replicas    = var.max_replicas
    min_replicas    = var.min_replicas
    cooldown_period = 30

    cpu_utilization {
      target = 0.75
    }
  }
}

resource "google_compute_http_health_check" "default" {
  name               = var.hc_name
  request_path       = "/"
  check_interval_sec = 1
  timeout_sec        = 1
}

# Compute Healthcheck
resource "google_compute_health_check" "default" {
  name               = var.hc_name
  check_interval_sec = 1
  timeout_sec        = 1

  tcp_health_check {
    port = var.hc_port
  }
}
