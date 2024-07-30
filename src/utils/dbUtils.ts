// dbUtils.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function clearDatabase() {
    try {
        await prisma.gameCategory.deleteMany();
        await prisma.game.deleteMany({});
        await prisma.category.deleteMany({});
        // Adicione outras tabelas que deseja limpar aqui
        console.log('Banco de dados limpo com sucesso.');
    } catch (error) {
        console.error('Erro ao limpar o banco de dados:', error);
    } finally {
        await prisma.$disconnect();
    }
}
