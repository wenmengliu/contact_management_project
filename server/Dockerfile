# Stage 1: Build the Node.js application
FROM node:14 as build

WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install Node.js dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Node.js application
RUN yarn build

# Stage 2: Set up MongoDB and run the application
FROM node:14

# Install MongoDB client
RUN apt-get update && apt-get install -y mongodb-clients

# Create a directory for the MongoDB data
RUN mkdir -p /data/db

# Expose the MongoDB default port
EXPOSE 27017

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app ./

# Ex
