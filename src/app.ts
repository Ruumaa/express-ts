import { config } from 'dotenv';
config();
import express, { Application, NextFunction, Request, Response } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { router } from './routes/routes';
import cors from 'cors';

const app: Application = express();
const PORT: number | string = process.env.PORT || 5000;

app.use(cors());
//middleware handle JSON request
app.use(express.json());

app.use('/', router);

// middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server runnning on Port ${PORT}`);
});
