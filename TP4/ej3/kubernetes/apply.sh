kubectl create configmap credentials-config --from-file=../credentials.json
kubectl apply -f config.yml
cd deployments
kubectl apply -f entry-server.yml
kubectl apply -f redis.yml
kubectl apply -f split-service.yml
cd ../services
kubectl apply -f entry-server.yml
kubectl apply -f redis.yml
kubectl apply -f split-service.yml
sleep 10

# Obtener el nombre del deployment entry-server deployment.
# pod_name=$(kubectl get pods -o=jsonpath='{.items[0].metadata.name}')
service_name=$(kubectl get services -o=jsonpath='{.items[0].metadata.name}')

if [ -z "$service_name" ]; then
    echo "No se encontraron servicios"
    exit 1
else 
    echo $service_name
fi

echo $service_name

kubectl port-forward service/entry-server 5000:5000
