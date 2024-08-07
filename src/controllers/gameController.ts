// controllers/gameController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ping = (req: Request, res: Response) => {
	res.send({ pong: true });
};

// Get all games
export const getAllGames = async (req: Request, res: Response) => {
	try {
		const games = await prisma.game.findMany({
			include: {
				categories: {
					include: {
						category: true, // It returns with the game's categories
					},
				},
			},
		});

		// Format the response to include the categories.
		const formattedGames = games.map((game) => ({
			id: game.id,
			name: game.name,
			rate: game.rate,
			categories: game.categories.map((gc) => gc.category),
		}));

		res.status(200).json({ games: formattedGames });
	} catch (error) {
		res.status(500).json({ error: 'Error fetching games' });
	} finally {
		await prisma.$disconnect();
	}
};

// Get a game by ID
export const getGameById = async (req: Request, res: Response) => {
	const gameId = parseInt(req.params.id);
	try {
		const game = await prisma.game.findUnique({
			where: { id: gameId },
			include: {
				categories: {
					include: {
						category: true, // It returns with the game's categories
					},
				},
			},
		});

		if (!game) {
			res.status(404).json({ error: 'Game not found' });
			return;
		}

		const formattedGame = {
			id: game.id,
			name: game.name,
			rate: game.rate,
			categories: game.categories.map((gc) => gc.category),
		};

		res.status(200).json({ game: formattedGame });
	} catch (error) {
		res.status(500).json({ error: 'Error fetching game' });
	} finally {
		await prisma.$disconnect();
	}
};

// Create a new game
export const createGame = async (req: Request, res: Response) => {
	const { name, rate, categoryIds } = req.body as {
		name: string;
		rate: number;
		categoryIds: number[];
	};
	try {
		const newGame = await prisma.game.create({
			data: {
				name,
				rate,
				categories: {
					create: categoryIds.map((categoryId: number) => ({
						category: {
							connect: { id: categoryId },
						},
					})),
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					},
				},
			},
		});
		res.status(201).json({ game: newGame });
	} catch (error) {
		res.status(500).json({ error: 'Error creating game' });
		console.log(error);
	} finally {
		await prisma.$disconnect();
	}
};

// Update a game by ID
export const updateGame = async (req: Request, res: Response) => {
	const gameId = parseInt(req.params.id);
	const { name, rate, categoryIds } = req.body;
	try {
		const updatedGame = await prisma.game.update({
			where: { id: gameId },
			data: {
				name,
				rate,
				categories: {
					deleteMany: {}, // Remove todas as associações existentes
					create: categoryIds.map((categoryId: number) => ({
						category: {
							connect: { id: categoryId },
						},
					})),
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					},
				},
			},
		});
		res.status(200).json({ game: updatedGame });
	} catch (error) {
		res.status(500).json({ error: 'Error updating game' });
	} finally {
		await prisma.$disconnect();
	}
};

// Delete a game by ID
export const deleteGame = async (req: Request, res: Response) => {
	const gameId = parseInt(req.params.id);
	if (isNaN(gameId)) return res.status(400).json({ error: 'Invalid game ID' });
	try {
		const game = await prisma.game.findUnique({ where: { id: gameId } });
		if (!game) return res.status(404).json({ error: 'Game not found' });

		// Delete in the categories table as well.
		await prisma.gameCategory.deleteMany({
			where: { gameId: gameId },
		});

		// And then, delete the game.
		await prisma.game.delete({
			where: { id: gameId },
		});

		res.status(204).json({ message: 'Game deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting game' });
		console.log(error);
	} finally {
		await prisma.$disconnect();
	}
};
