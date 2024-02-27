imageVersion=$1
echo "Start creating new docker image. Version: $imageVersion"
docker build -f prod.Dockerfile -t snawlak/sa_app:"$imageVersion" .
docker push snawlak/sa_app:"$imageVersion"
echo "done"
