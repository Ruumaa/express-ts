import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { User } from '../types';
import { hash } from 'bcrypt';

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.user.findMany();
    res.status(200).json({ message: 'GET data success', data: data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    interface UserPatch {
      name?: string;
      email?: string;
      address?: string;
    }
    const { name, email, address }: UserPatch = await req.body;
    const existUser = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!existUser) {
      return res
        .status(409)
        .json({ message: `User with id ${id} not found! ` });
    }
    if (email) {
      const existName = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existName) {
        return res.status(409).json({ message: 'Email already exist' });
      }
    }

    const data = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        name,
        email,
        address,
      },
    });
    const { password: userPassword, ...SecureData } = data;

    res.status(201).json({ message: 'PATCH user success', SecureData });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existUser = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!existUser) {
      return res
        .status(409)
        .json({ message: `User with id ${id} not found! ` });
    }

    await prisma.user.delete({
      where: {
        id: +id,
      },
    });
    res.status(204).json({ message: 'DELETE user success' });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { getAllUser, updateUser, deleteUser };
