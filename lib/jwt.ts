import { User, UserLogin, ValidationRequest } from '../src/types';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY!;
const generateToken = (payload: UserLogin) => {
  const exp = 60 * 60 * 5;
  return jwt.sign(payload, secretKey, { expiresIn: exp });
};
const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };
