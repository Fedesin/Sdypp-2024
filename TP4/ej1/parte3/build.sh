
docker container rm -f splitter-joiner
docker image rm splitter-joiner
docker build -t splitter-joiner .
docker compose up -d
docker logs --follow splitter-joiner