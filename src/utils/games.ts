// games.ts

import { categories } from './categories';

export type Game = {
  name: string;
  rate: number;
  categoryId: number;
}

export const games: Game[] = [
  {
    name: 'Game 1',
    rate: 4,
    categoryId: categories.find(cat => cat.name === 'Action')?.id || 1,
  },
  {
    name: 'Game 2',
    rate: 5,
    categoryId: categories.find(cat => cat.name === 'Adventure')?.id || 2,
  },
  {
    name: 'League Of Legends',
    rate: 0,
    categoryId: categories.find(cat => cat.name === 'MOBA')?.id || 3,
  },
  {
    name: 'Undertale',
    rate: 10,
    categoryId: categories.find(cat => cat.name === 'Adventure')?.id || 2,
  },
];
