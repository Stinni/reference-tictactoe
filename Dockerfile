FROM node
WORKDIR /code
COPY package.json .
RUN npm install --silent
ADD build.tar.gz .
EXPOSE 3000
CMD ["node","run.js"]