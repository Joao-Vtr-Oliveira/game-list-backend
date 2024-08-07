// dbUtils.ts

import { PrismaClient } from '@prisma/client';
import { categories } from './categories';
import { games } from './games';

const prisma = new PrismaClient();

// Function that cleans the DB
export async function clearDatabase() {
	try {
		await prisma.gameCategory.deleteMany();
		await prisma.game.deleteMany({});
		await prisma.category.deleteMany({});
		console.log('Banco de dados limpo com sucesso.');
	} catch (error) {
		console.error('Erro ao limpar o banco de dados:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Function that checks the DB and initialize it if it's empty with the base games and categories.
export async function initializeDatabase() {
	try {
        if((await prisma.category.findMany()).length > 0) return console.log('DB already has games and categories.');
		await clearDatabase();

		for (const category of categories) {
			const existingCategory = await prisma.category.findUnique({
				where: { id: category.id },
			});
			if (!existingCategory) {
				await prisma.category.create({
					data: {
						id: category.id,
						name: category.name,
					},
				});
			}
		}

		for (const game of games) {
			const { name, rate, categoryIds } = game;
			const createdGame = await prisma.game.create({
				data: {
					name,
					rate,
				},
			});

			for (const categoryId of categoryIds) {
				await prisma.gameCategory.create({
					data: {
						gameId: createdGame.id,
						categoryId,
					},
				});
			}
		}

		console.log('Database initialized with initial categories and games.');
	} catch (error) {
		console.error('Error initializing database:', error);
	} finally {
		await prisma.$disconnect();
	}
}
