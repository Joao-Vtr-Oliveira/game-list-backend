FROM node:20.3.0-alpine3.18
WORKDIR /app
EXPOSE 3000
ENV POSTGRES_DB=lista_de_contato
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_PORT=5432
ENV POSTGRES_HOST=postgres
COPY package-lock.json .
COPY package.json .
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node
COPY . .
CMD [ "npm", "run", "start-dev" ]