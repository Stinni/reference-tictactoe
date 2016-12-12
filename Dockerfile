FROM node
WORKDIR /code
COPY package.json .
RUN npm install --silent
ADD build.tar.gz .
COPY runserver.sh ./build/
EXPOSE 3000
EXPOSE 8080
ENV NODE_PATH .
RUN cd build && chmod u+x runserver.sh
CMD ["./build/runserver.sh"]