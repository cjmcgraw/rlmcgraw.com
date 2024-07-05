FROM node:latest as builder
WORKDIR /build

COPY . .
RUN npm install
RUN npm run build
RUN ls -al dist/

# this is the asset that goes out to production
FROM nginx:latest as production
ARG sitename=rlmcgraw
WORKDIR /var/www/$sitename
COPY --from=builder /build/dist dist
RUN ls -al dist
COPY nginx.conf /etc/nginx/nginx.conf

# this is the example of running it locally
FROM production as dev
USER root
SHELL ["/bin/bash", "--login", "-eu", "-c"]

ENV NVM_VERSION v0.33.11
ENV NODE_VERSION v7.5.0
ENV NVM_DIR /usr/local/nvm
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN echo "source ${NVM_DIR}/nvm.sh" >> ~/.bash_profile

WORKDIR /workdir
RUN find / -type f -name '*nvm.sh*'

COPY . .
RUN nvm install && nvm use && nvm alias default $(nvm current)
RUN npm config set loglevel verbose
RUN npm ci
RUN npm run build
ENTRYPOINT ["/bin/bash", "--login", "-eu", "-c", "./dev-entrypoint.sh"]
