import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const data = await prisma.books.findMany();
    res.status(200).json({ message: 'Get all book success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, price, desc } = req.body;
    const data = await prisma.books.create({ data: { title, price, desc } });
    res.status(201).json({ message: 'Add book success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, desc, price } = await req.body;

    const existBook = await prisma.books.findUnique({ where: { id } });
    if (!existBook) {
      return res.status(409).json({ message: `Book with id ${id} not found!` });
    }

    const data = await prisma.books.update({
      where: { id },
      data: { title, desc, price },
    });
    res.status(200).json({ message: 'Update boook success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existBook = await prisma.books.findUnique({ where: { id } });
    if (!existBook) {
      return res.status(409).json({ message: `Book with id ${id} not found!` });
    }

    await prisma.books.delete({ where: { id } });
    res.status(204).json({ message: `Book with id ${id} has been deleted` });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
