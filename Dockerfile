FROM node
WORKDIR /code
COPY package.json .
RUN npm install --silent
ADD build.tar.gz .
EXPOSE 3000
CMD ["cd", "build"]
CMD ["ls"]
CMD ["node", "run.js"]