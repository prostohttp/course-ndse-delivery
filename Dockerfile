FROM node:latest
WORKDIR /app
EXPOSE 8080
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]