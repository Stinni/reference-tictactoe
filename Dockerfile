# the 'docker build' command (that uses this file) is always run from the /build folder

FROM node
MAINTAINER Kristinn Heiðar Freysteinsson <kristinnf13@ru.is>
WORKDIR /code

# Copies all contents of the /build folder into the working directory ( /code )
COPY . .

# Installs dependencies
RUN npm install --silent

# exposes port 8080 for access to the server
EXPOSE 8080
ENV NODE_PATH .

# not sure if it's needed but this makes the script file executable
RUN chmod u+x runserver.sh

# executes the script that takes care of db migration and starting the server
CMD ["./runserver.sh"]