#!/bin/bash

# Used to quickly start up the development mode
# The postgres docker container must be running before using this script!

npm run migratedb
npm run dev