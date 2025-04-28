# Stage 1: Build the React app
FROM node:20 as build

WORKDIR /app

# Copy dependency files and config files
COPY package*.json vite.config.* tailwind.config.* postcss.config.* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# 🛠️ Create .env file before build
RUN echo "VITE_FIREBASE_API_KEY=AIzaSyBug_EQX14McoqB9Rl9rlzHpX-nyn9hp0M" > .env && \
    echo "VITE_FIREBASE_AUTH_DOMAIN=noteboost.firebaseapp.com" >> .env && \
    echo "VITE_FIREBASE_PROJECT_ID=noteboost" >> .env && \
    echo "VITE_FIREBASE_APP_ID=1:772262781875:web:e8082522f428b2e19f21c6" >> .env

# Rebuild esbuild (optional if needed)
RUN npm rebuild esbuild

# Build the app
RUN npm run build

# Stage 2: Serve the built app
FROM node:20-slim

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 8080

# Serve
CMD ["serve", "-s", "dist", "-l", "8080"]