#!/bin/bash

# Used to quickly start up the development mode
# The postgres docker container is first started up and I used the 'sleep' trick
# as in the 'runserver.sh' file so that the server is definetly running when the migration is run.

npm run startdockerdb
sleep 10
npm run migratedb
npm run dev