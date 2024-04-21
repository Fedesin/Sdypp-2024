username=$(cat ./temp/username.txt | tr -d '"')
instance_ip=$(cat ./temp/instance_ip.txt | tr -d '"')

echo $username
echo $instance_ip

ssh -i ./.keys/ssh_private_key.pem ${username}@${instance_ip}