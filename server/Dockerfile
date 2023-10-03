# Use an official Node.js runtime as a parent image
FROM node:14

# Install nodemon globally using yarn
RUN yarn global add nodemon

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install Node.js dependencies using yarn
RUN yarn install

# Install MongoDB from the official MongoDB repository
RUN apt-get update && apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && apt-get install -y mongodb-org

# Create a directory for MongoDB data
RUN mkdir -p /data/db

# Expose the ports for your Node.js application and MongoDB
EXPOSE 3000
EXPOSE 27017

# Copy the rest of the application code to the working directory
COPY . .

# Create a shell script to start MongoDB and your Node.js application
RUN echo "#!/bin/bash" >> start.sh && \
    echo "mongod --dbpath /data/db --fork --logpath /var/log/mongodb.log & sleep 10" >> start.sh && \
    echo "yarn run dev" >> start.sh && \
    chmod +x start.sh

# Define the command to run the shell script
CMD ["./start.sh"]
