# Use official Node.js LTS image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server code
COPY . /app

# Expose the port
EXPOSE 9000

# Start the app
CMD ["npm", "start"]