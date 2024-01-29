import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../lib/jwt';
import jwt from 'jsonwebtoken';
import { UserData, ValidationRequest } from '../types';

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ValidationRequest = req as ValidationRequest;
  const { authorization } = ValidationRequest.headers;
  if (!authorization || typeof authorization !== 'string') {
    return res.status(401).json({
      message: 'Token needed',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const jwtDecode = verifyToken(token);
    if (typeof jwtDecode !== 'string') {
      ValidationRequest.userData = jwtDecode as UserData;
    }
  } catch (error: Error | any) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
