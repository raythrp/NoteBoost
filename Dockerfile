# Stage 1: Build the React app
FROM node:20 as build

WORKDIR /app

# Copy dependency files and config files
COPY package*.json vite.config.* tailwind.config.* postcss.config.* ./

# Install dependencies (skip peer conflict problems)
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Fix esbuild for Linux inside Docker
RUN npm rebuild esbuild

# Build the app
RUN npm run build

# Stage 2: Serve the built app with a lightweight server
FROM node:20-slim

WORKDIR /app

# Install a tiny static server
RUN npm install -g serve

# Copy built files from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port
EXPOSE 8080

# Command to serve
CMD ["serve", "-s", "dist", "-l", "8080"]