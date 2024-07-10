// server.ts

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRoutes from './routes/games';
import categoryRoutes from './routes/categories';
import { PrismaClient } from '@prisma/client';
import { categories } from './utils/categories';
import { games, Game } from './utils/games';
import { clearDatabase } from './utils/dbUtils';

dotenv.config();

const prisma = new PrismaClient();
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta 'public'
server.use(express.static(path.join(__dirname, '../public')));

// Rotas principais para jogos e categorias
server.use(mainRoutes);
server.use(categoryRoutes);

// Middleware para lidar com rotas não encontradas
server.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Page not found');
});

// Middleware para tratamento global de erros
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Função para inicializar o banco de dados com categorias e jogos
async function initializeDatabase() {
  try {
    // Limpar o banco de dados antes de adicionar novos dados
    await clearDatabase();

    // Criar categorias no banco de dados
    for (const category of categories) {
      await prisma.category.create({
        data: {
          id: category.id, // Definir o ID da categoria
          name: category.name,
        },
      });
    }

    // Associar jogos com categorias
    for (const game of games) {
      const { name, rate, categoryId } = game;
      await prisma.game.create({
        data: {
          name,
          rate,
          categoryId,
        },
      });
    }

    console.log('Database initialized with initial categories and games.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Inicializar o banco de dados ao iniciar o servidor
async function startServer() {
  await initializeDatabase();
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Iniciar o servidor
startServer();
