FROM node:20.3.0-alpine3.18

WORKDIR /app
EXPOSE 3000

COPY package-lock.json .
COPY package.json .
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node

COPY schema.prisma .
COPY wait-for-it.sh .

COPY . .

RUN apk add --no-cache netcat-openbsd
ENV DATABASE_URL=postgresql://postgres:1234@postgres:5432/lista_de_contato
RUN chmod +x wait-for-it.sh

CMD ["sh", "-c", "./wait-for-it.sh postgres 5432 -- npx prisma generate && npx prisma db push && npm run start-dev"]
