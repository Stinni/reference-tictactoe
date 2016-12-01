#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo GIT_COMMIT is $GIT_COMMIT

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

echo GIT_COMMIT is now $GIT_COMMIT
echo GIT_URL is $GIT_URL

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

echo GITHUB_URL is $GITHUB_URL

echo Building app
npm build

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
else
    echo "Build successfull!"
fi

cat > ./dist/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

echo "Done"
