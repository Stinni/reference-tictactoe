#!/bin/bash

npm run startdockerdb
sleep 10
npm run migratedb
npm run dev