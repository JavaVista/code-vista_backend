FROM node:16-alpine3.17 as build

WORKDIR /usr/src/app

# Receive the build arguments
ARG NODE_ENV
ARG ROOT_DOMAIN_DEV
ARG ROOT_DOMAIN_PROD
ARG SUPABASE_URL
ARG SUPABASE_KEY

COPY package*.json ./

RUN npm ci

COPY . .

# Set the environment variables 
ENV NODE_ENV=${NODE_ENV} \
    ROOT_DOMAIN_DEV=${ROOT_DOMAIN_DEV} \
    ROOT_DOMAIN_PROD=${ROOT_DOMAIN_PROD} 

CMD [ "npm", "start" ]
