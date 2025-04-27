# Stage 1: Build the React app
FROM node:20 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
COPY vite.config.* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app with a lightweight server
FROM node:20-slim

WORKDIR /app

# Install a tiny static server
RUN npm install -g serve

# Copy built files from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port that serve will listen on
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "8080"]