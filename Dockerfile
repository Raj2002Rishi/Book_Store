# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
# Use npm ci for potentially faster and more reliable installs if lock file exists
RUN npm ci || npm install
COPY . .
RUN npm run build

# Stage 2: Serve the static files with a minimal Node.js environment
FROM node:18-alpine
WORKDIR /app
# Install only the 'serve' package globally
# This avoids bringing in devDependencies or other dependencies from package.json
RUN npm install -g serve
# Copy only the built static assets from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000
# Use the globally installed 'serve' command
CMD ["serve", "-s", "dist", "-l", "3000"]
