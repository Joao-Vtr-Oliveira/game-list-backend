// categories.ts

export type Category = {
  id: number; // Adicionar a propriedade id
  name: string;
}

export const categories: Category[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 3, name: 'MOBA' },
  { id: 4, name: 'FPS' },
];
