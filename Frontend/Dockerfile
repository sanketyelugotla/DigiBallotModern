# Step 1: Build the React app
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output from the 'dist' directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
