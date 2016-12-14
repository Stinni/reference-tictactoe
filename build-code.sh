#!/bin/bash

# Checking if the 'GIT_COMMIT' environment variable is set and setting it if it isn't.
# It's needed for the .env file and the version.html file that're made.
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

# TODO: FINISH COMMENTING!!!
cd client
npm install --silent
cd ..
npm install --silent

./build.sh

rc=$?
if [[ $rc != 0 ]]; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

cat > .env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

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

cp ./package.json ./build/
cp ./Dockerfile ./build/
cp ./runserver.sh ./build/

echo "Done"