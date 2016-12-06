FROM node
WORKDIR /code
COPY package.json .
RUN npm install --silent
ADD build.tar.gz .
EXPOSE 8080
CMD ["node", "./build/run.js"]