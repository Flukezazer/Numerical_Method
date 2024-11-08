# Step 1: Build the application
# Use a node image to build the app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app’s source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the application
# Use a lightweight server image to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
