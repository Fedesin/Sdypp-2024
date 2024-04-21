terraform apply -auto-approve -no-color | tee terraform_output.txt

# Extraer las claves SSH de la salida de Terraform
username=$(terraform output username)
instance_ip=$(terraform output instance_ip)

# Escribir las claves en archivos
echo "$username" > ./temp/username.txt
echo "$instance_ip" > ./temp/instance_ip.txt