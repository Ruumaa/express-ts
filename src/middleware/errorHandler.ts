import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};
