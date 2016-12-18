#!/bin/bash

# Makes sure that we exit immediately if a command exits with a non-zero status.
set -e

# sets the path to node to the current directory
export NODE_PATH=.
 
echo "Cleaning..."
npm run clean			# runs the 'clean' script in package.json that removes the previous build (if present)

echo "Building app"
npm run createbuild				# runs the 'createbuild' script in package.json
npm run buildclient				# runs the 'buildclient' script in package.json
mv client/build build/static	# a simple move command
cp -R server build/server		# copies everything in the server folder into the build/server folder
mkdir -p build/client/src		# creates a folder for the client inside the build folder
cp -r client/src/common build/client/src	# and more copying...
cp run.js build					# and even more copying... :)