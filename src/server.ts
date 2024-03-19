import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import mainRoutes from './routes/script';

const server = express();
server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

server.use((req: Request, res: Response) => {
  res.status(404).send('Página não encontrada');
})

server.listen(80);