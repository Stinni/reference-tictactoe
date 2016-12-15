#!/bin/bash

ssh -i "../../.ssh/HGOP1.pem" ubuntu@52.214.44.254 docker-compose stop
scp -i "../../.ssh/HGOP1.pem" ./docker-compose.yml ubuntu@52.214.44.254:~/docker-compose.yml
scp -i "../../.ssh/HGOP1.pem" ./.env ubuntu@52.214.44.254:~/.env
ssh -i "../../.ssh/HGOP1.pem" ubuntu@52.214.44.254 docker-compose up -d