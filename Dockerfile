FROM node
WORKDIR /code
COPY . .
RUN npm install --silent
EXPOSE 3000
EXPOSE 8080
ENV NODE_PATH .
RUN chmod u+x runserver.sh
CMD ["./runserver.sh"]