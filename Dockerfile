
FROM node:16.15.0 

WORKDIR /chat-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]