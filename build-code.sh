#!/bin/bash

# Checking if the 'GIT_COMMIT' environment variable is set and setting it if it isn't.
# It's needed for the .env file and the version.html file that're made.
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

# Moving between folders and installing dependencies for the client
cd client
npm install --silent

# Checking if an error occurred during the npm install
rc=$?
if [[ $rc != 0 ]]; then
    echo "Npm install failed with exit code " $rc
    exit $rc
fi

# Moving again between folders and installing dependencies for the server
cd ..
npm install --silent

# Checking if an error occurred during the npm install
rc=$?
if [[ $rc != 0 ]]; then
    echo "Npm install failed with exit code " $rc
    exit $rc
fi

# runs the build.sh script that builds the app
./build.sh

# Checking if an error occurred while building the app
rc=$?
if [[ $rc != 0 ]]; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

# creating the .env file for docker-compose with the current git commit hash
cat > .env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

# and creating the version file
cat > ./build/public/version.html <<_EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

# And finally copying a few files that're necessary for creating the docker image
cp ./package.json ./build/
cp ./Dockerfile ./build/
cp ./runserver.sh ./build/

echo "Done"