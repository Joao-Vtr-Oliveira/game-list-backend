// controllers/categoryController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanCategories = async () => {
  for(let i = 0; i <= 67; i++) {
    await prisma.category.delete({
      where: { id: i },
    });
  }
}

// Get all categories in the DB
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
    });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json({ category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
    console.log(error)
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
      },
    });
    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });
    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
