#!/bin/bash

# Checking if the 'GIT_COMMIT' environment variable is set and setting it if it isn't.
# It's needed for the docker build and push commands run below.
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
fi

cd build

echo "Building docker image"

# Here the docker image gets built. It's tagged with the git commit hash
docker build -t stinni/tictactoe:$GIT_COMMIT .

# Checking if an error occurred during the docker image build
rc=$?
if [[ $rc != 0 ]]; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Pushing docker image to hub"

# Here the docker image gets pushed to dockerhub
docker push stinni/tictactoe:$GIT_COMMIT

# Checking if an error occurred during the docker image push
rc=$?
if [[ $rc != 0 ]]; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Done"