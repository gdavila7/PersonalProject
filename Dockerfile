FROM node:14
#install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
RUN npm install pm2 -g
RUN useradd --user-group --create-home --shell /bin/false appuser
ENV HOME=/home/appuser
# Create app directory
RUN mkdir -p $HOME/app
WORKDIR $HOME/app
COPY package*.json $HOME/app/
#COPY pm2.docker.process.yml $HOME/app/
#
RUN chown -R appuser:appuser $HOME/*
USER appuser
##install npm for API
RUN npm install
COPY . $HOME/app
EXPOSE 7000
CMD ["pm2-runtime start npm -- run server"] 