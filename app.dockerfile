FROM node:20.3.0-alpine3.18
WORKDIR /app
EXPOSE 3000

COPY package-lock.json .
COPY package.json .
RUN npm install

COPY schema.prisma .

ENV DATABASE_URL=postgresql://postgres:1234@postgres:5432/lista_de_contato
RUN npx prisma generate
RUN npx prisma db push

COPY . .

CMD ["npm", "run", "start-dev"]
