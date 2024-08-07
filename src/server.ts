// server.ts
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRoutes from './routes/games';
import categoryRoutes from './routes/categories';
import { initializeDatabase } from './utils/dbUtils';

dotenv.config();

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


export async function startServer() {
  await initializeDatabase();
  const PORT = process.env.PORT || 3000;
  return new Promise<any>((resolve, reject) => {
    const serverInstance = server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      resolve(serverInstance);
    }).on('error', reject);
  });
}

if(process.env.NODE_ENV !== 'test') {
  startServer();
}