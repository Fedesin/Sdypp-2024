resource "tls_private_key" "keys" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "ssh_private_key_pem" {
  content         = tls_private_key.keys.private_key_pem
  filename        = ".keys/ssh_private_key.pem"
  file_permission = "0600"
}


# resource "local_file" "ssh_public_key_pub" {
#   content         = tls_private_key.ssh.public_key_openssh
#   filename        = ".keys/ssh_public_key.pub"
#   file_permission = "0600"
# }
