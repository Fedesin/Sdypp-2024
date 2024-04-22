username=$(cat ./temp/username.txt | tr -d '"')
instance_ip=$(cat ./temp/instance_ip.txt | tr -d '"')

scp -i ./.keys/ssh_private_key.pem ./README.md ${username}@${instance_ip}:/home/${username}
