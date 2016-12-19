# Self Assessment
<hr />



## Git Repository:
https://github.com/Stinni/reference-tictactoe

(hap2000 has been added as a collaborator and should have commit/push access)
<hr />



## Jenkins URL, username and password:
http://82.221.48.65:8080/

(username and password are on myschool)
<hr />



## Game URL (AWS):
http://52.214.44.254/
<hr />



## Scripts:

- build.sh - This is the build script from the package.json file. It simply cleans up (deletes) a previous build (if present) and then builds the application.

- build-code.sh - This script uses the build.sh script to build the application. It sets environment variables that're used during the build process and also stores the GIT_COMMIT hash in an .env file that's used later by the docker-compose command. It ends with copying a few files that're needed to build the docker image.

- build-docker.sh - This script takes care of building the docker image from the newest code and pushes it to the dockerhub.

- build-deployment.sh - This script stops the current running docker-compose containers on the AWS machine, copies the .yml and .env files to said machine and then runs docker-compose to start up the new version.

- AWS Provisioning & Docker compose - I did not get as far as doing the AWS provisioning. I also didn't create any scripts for running docker compose.

- Other scripts - I added a few scripts to the package.json file but I ended up deleting most of them as they weren't needed. I did keep the 'migratedbProd' script I added for simplicity in running the production environment.

<hr />



## Testing & logic:
Outline what tests you created.
UnitTests, server logic TDD (Git commit log)
API Acceptance test - fluent API
Load test loop
UI TDD
Is the game playable?
<hr />



## Data migration
Did you create a data migration.
Migration up and down
<hr />



## Jenkins
Do you have the following Jobs and what happens in each Job:
Commit Stage
Acceptance Stage
Capacity Stage
Other
<hr />



Did you use any of the following features in Jenkins?

- Schedule or commit hooks

- Pipeline

- Jenkins file

- Test reports

- Other



## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.



## Other

Anything else you did to improve you deployment pipeline of the project itself?