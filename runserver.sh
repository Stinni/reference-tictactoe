#!/bin/bash

set -e

sleep 10
npm run migratedbProd
node run.js

exit 0