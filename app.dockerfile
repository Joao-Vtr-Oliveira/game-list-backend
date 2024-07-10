FROM node:20.3.0-alpine3.18

WORKDIR /app
EXPOSE 3000

COPY package-lock.json .
COPY package.json .
RUN npm install

COPY schema.prisma .
COPY wait-for-it.sh .

# Instalar netcat para verificar a disponibilidade do PostgreSQL
RUN apk add --no-cache netcat-openbsd

# Definir DATABASE_URL antes de rodar os comandos do Prisma
ENV DATABASE_URL=postgresql://postgres:1234@postgres:5432/lista_de_contato

# Torne o script executável
RUN chmod +x wait-for-it.sh

# Use o script para esperar o PostgreSQL estar pronto antes de rodar os comandos do Prisma
CMD ["./wait-for-it.sh", "postgres", "5432", "--", "sh", "-c", "npx prisma generate && npx prisma db push && npm run start-dev"]
