resource "tls_private_key" "keys" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "ssh_private_key_pem" {
  content         = tls_private_key.keys.private_key_pem
  filename        = ".keys/ssh_private_key.pem"
  file_permission = "0600"
}


resource "local_file" "username" {
  content         = split("@", data.google_client_openid_userinfo.me.email)[0]
  filename        = "temp/username.txt"
  file_permission = "0600"
}
