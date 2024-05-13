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

# Obtener el nombre del deployment
# pod_name=$(kubectl get pods -o=jsonpath='{.items[0].metadata.name}')
pod_name=$(kubectl get pods -o=jsonpath='{.items[2].metadata.name}')

if [ -z "$pod_name" ]; then
    echo "No se encontraron pods."
    exit 1
fi

echo $pod_name

kubectl port-forward $pod_name 5001:5000
# kubectl port-forward $pod_name 6379:6379
