import { Request, Response } from 'express';

export const getHealth = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ message: 'Testing health success', data: 'Lagi santai kawan' });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
