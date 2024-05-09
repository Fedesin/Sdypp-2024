docker compose down
cd split-service
docker build -t split-service .
cd ..
docker compose up -d