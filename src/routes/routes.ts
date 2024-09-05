import { Router } from 'express';
import {
  deleteUser,
  getAllUser,
  updateUser,
} from '../controller/usercontroller';
import { AuthRouter } from '../auth/auth';
import { authorization } from '../middleware/authentication';
import { getHealth } from '../controller/healthcontroller';
import {
  addBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from '../controller/bookcontroller';

const router = Router();

router.get('/api/health', getHealth);
router.get('/api/book/', getAllBooks);

router.use('/api/user/', AuthRouter);
router.use(authorization);
router.get('/api/user/', authorization, getAllUser);
router.patch('/api/user/:id', authorization, updateUser);
router.delete('/api/user/:id', authorization, deleteUser);

// Books
router.post('/api/book/', authorization, addBook);
router.put('/api/book/:id', authorization, updateBook);
router.delete('/api/book/:id', authorization, deleteBook);

export { router };
