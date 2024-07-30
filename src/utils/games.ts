import { categories } from './categories';

export type Game = {
  name: string;
  rate: number;
  categoryIds: number[];
}

export const games: Game[] = [
  {
    name: 'Game 1',
    rate: 4,
    categoryIds: [
      categories.find(cat => cat.name === 'Action')?.id || 1,
      categories.find(cat => cat.name === 'Adventure')?.id || 2
    ],
  },
  {
    name: 'Game 2',
    rate: 5,
    categoryIds: [categories.find(cat => cat.name === 'Adventure')?.id || 2],
  },
  {
    name: 'League Of Legends',
    rate: 0,
    categoryIds: [categories.find(cat => cat.name === 'MOBA')?.id || 3],
  },
  {
    name: 'Undertale',
    rate: 10,
    categoryIds: [categories.find(cat => cat.name === 'Adventure')?.id || 2],
  },
];
