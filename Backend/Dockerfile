# Step 1: Set up Node.js environment
FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
EXPOSE 5000
CMD ["node", "index.js"]
