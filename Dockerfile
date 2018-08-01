FROM node:latest

MAINTAINER Steve Leon
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 7001
ENTRYPOINT ["npm", "start"]
