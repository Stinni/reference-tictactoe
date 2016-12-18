#!/bin/bash

# the HGOP1.pem file is used for authentication. I left out the '-o StrictHostKeyChecking=no' because I've already 'ssh-ed' to the AWS machine.
# I might add it again if I get as far as the provisioning of a new machine for each new build/test run

# Stopping the current running containers
ssh -i "../../.ssh/HGOP1.pem" ubuntu@52.214.44.254 docker-compose stop

# copies (and overwrites) the docker-compose.yml file on the AWS machine with the one on the Jenkins machine
scp -i "../../.ssh/HGOP1.pem" ./docker-compose.yml ubuntu@52.214.44.254:~/docker-compose.yml

# copies (and overwrites) the .env file on the AWS machine with the one on the Jenkins machine
scp -i "../../.ssh/HGOP1.pem" ./.env ubuntu@52.214.44.254:~/.env

# and finally the 'up' command is run and the new image is fetched and started up along with the postgres container
ssh -i "../../.ssh/HGOP1.pem" ubuntu@52.214.44.254 docker-compose up -d