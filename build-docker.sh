#!/bin/bash

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
fi

cd build

echo "Building docker image"

docker build -t stinni/tictactoe:$GIT_COMMIT .

rc=$?
if [[ $rc != 0 ]]; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Pushing docker image to hub"

docker push stinni/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]]; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Done"