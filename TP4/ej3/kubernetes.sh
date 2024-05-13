kubectl create configmap credentials-config --from-file=credentials.json
cd k8s
kubectl apply -f config.yml
cd deployments
kubectl apply -f entry-server.yml
cd ../services
kubectl apply -f entry-server-service.yml
sleep 10

# Obtener el nombre del deployment
pod_name=$(kubectl get pods -o=jsonpath='{.items[0].metadata.name}')

if [ -z "$pod_name" ]; then
    echo "No se encontraron pods."
    exit 1
fi

kubectl port-forward $pod_name 5001:5000
