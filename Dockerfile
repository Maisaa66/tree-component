FROM alpine:3.17

RUN apk update
RUN apk add bash

WORKDIR /tmp
RUN wget https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz
RUN tar -xf node-v18.12.1-linux-x64.tar.xz --directory=/usr/local --strip-components=1
RUN rm node-v18.12.1-linux-x64.tar.xz

RUN apk add npm
RUN npm install -g npm

SHELL [ "/bin/bash", "-c" ]

WORKDIR tree-component

## Copy the configuration and install dependencies. This part does not change so often during development.
COPY package.json package.json
COPY .eslintignore .eslintignore
COPY .eslintrc.js .eslintrc.js
COPY tsconfig.json tsconfig.json

RUN npm install --ignore-scripts --network-timeout 100000

# Copy the sources and assets which change often to image.
COPY assets assets
COPY src src

RUN npm postinstall
RUN npm build

# Make a command to keep the container running when started.
CMD ["tail", "-f", "/dev/null"]
