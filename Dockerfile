FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install --verbose
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]