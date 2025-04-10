# docker build -t djuno-app-starterkit .
# docker run -p 8080:80 djuno-app-starterkit

# Step 1: Build React app using Node.js
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve app with Nginx
FROM nginx:alpine

# Copy built assets from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Replace default Nginx config (optional, if you need client-side routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]