import { Router } from 'express';
import {
  deleteUser,
  getAllUser,
  updateUser,
} from '../controller/usercontroller';
import { AuthRouter } from '../auth/auth';
import { authorization } from '../middleware/authentication';

const router = Router();

router.use('/api/user/', AuthRouter);
router.use(authorization);

router.get('/api/user/', authorization, getAllUser);
router.patch('/api/user/:id', authorization, updateUser);
router.delete('/api/user/:id', authorization, deleteUser);

export { router };
