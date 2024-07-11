import { Router } from 'express';
import { register, login, editUser, deactivateUser } from '../controllers/userController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', authMiddleware, register);
router.post('/login', login);
router.put('/:id', authMiddleware, editUser);
router.delete('/:id', authMiddleware, deactivateUser);

export default router;
