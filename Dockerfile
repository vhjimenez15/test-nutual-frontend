FROM node:18 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install vite
RUN npm install
