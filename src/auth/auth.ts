import express, { NextFunction, Request, Response } from 'express';
import { User } from '../types';
import { prisma } from '../../lib/prisma';
import { compare, hash } from 'bcrypt';
import { generateToken } from '../../lib/jwt';

const router = express.Router();

// register
router.post(
  '/sign-up',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, address }: User = await req.body;
      const existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        return res.status(409).json({ message: 'Email already exist' });
      }

      const hashedPassword = await hash(password, 10);
      const data = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          address,
        },
      });
      const { password: userPassword, ...secureData } = data;
      res.status(201).json({ message: 'Sign-Up Success', secureData });
    } catch (error: Error | any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

//login
router.post('/sign-in', async (req: Request, res: Response) => {
  try {
    const { email, password }: User = await req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(409).json({ message: 'Email not found' });
    }
    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });
    res
      .status(200)
      .json({ message: 'Sign-in success', accessToken: accessToken });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export { router as AuthRouter };
