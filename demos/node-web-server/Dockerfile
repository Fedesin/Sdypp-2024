# Fetching the minified node image on apline linux
FROM node:hydrogen-alpine3.18

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /node-app

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Building our application
RUN npm run build

# Starting our application
CMD [ "node", "dist/index.js" ]

# Exposing server port
EXPOSE 3000