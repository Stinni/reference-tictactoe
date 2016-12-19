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

- Other scripts - I added a few scripts to the package.json file in the project root but I ended up deleting most of them as they weren't needed. I did keep the 'migratedbProd' script I added for simplicity in running the production environment. I also added the 'utest' scripts to both package.json files and they're used on the Jenkins server during the 'Unit Test Stage.'

<hr />


## Testing & logic:

I've been sick a lot this term and this course was no different. I've not been able to do as much as I'd have liked. And I might have focused a bit too much on everything else than actually developing the game and the tests. So I've only managed to get a few of the unit tests for the server logic working and just a bit of the server logic itself.

I tried to follow the TDD method as Gulli described it but I'm not sure I was doing it right. I only got carried away once though and started implementing something for a test that I hadn't got to yet.

I've not managed to get any of the API Acceptance tests nor the load tests running.

Is the game playable? No I'm afraid not, not at this moment at least... it might be closer to Christmas though! =)
<hr />


## Data migration

Did I create a data migration. Hmmmm... I'm not sure. I did create a new file in the './server/migrations/' folder to add in the 'aggregate_id' column. I'm guessing that's what's meant with this question.
<hr />


## Jenkins

I started by using a schedule for checking if there had been any changes done to the github repository. I changed that into a web hook later on. The only way I found to make a web hook work with a pipeline was to have a separate job that detects the hook and then starts up the pipeline. The pipeline I set up uses a Jenkinsfile from the github repository.

I've named my stages a bit differently:
- Commit Stage - pulls the new code from the github repository
- Unit Tests Stage - runs unit tests on both server and client logic
- Build Stage - builds the application and then the docker image and pushes it to dockerhub
- Deployment Stage - takes care of stopping the docker containers on the AWS machine, prepares the new one and starts them up


I used the following features in Jenkins:
- commit hooks
- Pipeline
- Jenkins file

<hr />


## Monitoring

I didn't implement any monitoring.
