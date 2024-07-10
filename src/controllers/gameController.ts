// controllers/gameController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ping = (req: Request, res: Response) => {
	res.send({ pong: true });
};

// Obtém todos os jogos
export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: { category: true }, // Inclui a categoria relacionada
    });
    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching games' });
  }
};

// Obtém um jogo pelo ID
export const getGameById = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id);
  try {
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { category: true }, // Inclui a categoria relacionada
    });
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }
    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching game' });
  }
};

// Cria um novo jogo
export const createGame = async (req: Request, res: Response) => {
  const { name, rate, categoryId } = req.body;
  try {
    const newGame = await prisma.game.create({
      data: {
        name,
        rate,
        categoryId,
      },
    });
    res.status(201).json({ game: newGame });
  } catch (error) {
    res.status(500).json({ error: 'Error creating game' });
  }
};

// Atualiza um jogo existente pelo ID
export const updateGame = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id);
  const { name, rate, categoryId } = req.body;
  try {
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        name,
        rate,
        categoryId,
      },
    });
    res.status(200).json({ game: updatedGame });
  } catch (error) {
    res.status(500).json({ error: 'Error updating game' });
  }
};

// Deleta um jogo pelo ID
export const deleteGame = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id);
  try {
    await prisma.game.delete({
      where: { id: gameId },
    });
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting game' });
  }
};
