output "instance_public_ips" {
  value       = [for instance in google_compute_instance.vm_instance : "${instance.name} - ${instance.network_interface[0].access_config[0].nat_ip}"]
  description = "The public IP addresses of the VM instances."
}

output "instance_ip" {
  value = google_compute_instance.vm_instance[0].network_interface[0].access_config[0].nat_ip
}

output "username" {
  value       = split("@", data.google_client_openid_userinfo.me.email)[0]
  description = "Email of the authenticated user."
}


output "ssh_private_key" {
  value     = tls_private_key.keys.private_key_pem
  sensitive = true
}

output "ssh_public_key" {
  value = tls_private_key.keys.public_key_openssh
}
