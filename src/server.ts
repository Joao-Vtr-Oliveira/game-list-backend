// server.ts
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import gamesRoutes from './routes/games';
import categoryRoutes from './routes/categories';
import { initializeDatabase } from './utils/dbUtils';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, '../public')));

// Routes for categories and games.
server.use(gamesRoutes);
server.use(categoryRoutes);

server.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Page not found');
});

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

// Just start the server if it's not setted to test mode.
if(process.env.NODE_ENV !== 'test') {
  startServer();
}