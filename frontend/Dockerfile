# Use the official Node.js image.
# Choose a version that matches your local development environment.
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install Vite and other dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite runs on
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
