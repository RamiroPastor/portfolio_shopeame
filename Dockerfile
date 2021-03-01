FROM node

RUN npm install -g json-server

COPY . /shopeame/backend

WORKDIR /shopeame/backend

CMD npm start