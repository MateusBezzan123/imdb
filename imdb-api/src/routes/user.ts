import { Router } from 'express';
import { check } from 'express-validator';
import { register, login, editUser, deactivateUser } from '../controllers/userController';
import authMiddleware from '../middleware/auth';

const router = Router();

const userValidations = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
];

router.post('/register', authMiddleware, userValidations, register);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.put(
  '/:id',
  authMiddleware,
  [
    check('name').optional().notEmpty().withMessage('Name is required'),
    check('email').optional().isEmail().withMessage('Email is invalid'),
  ],
  editUser
);

router.delete('/:id', authMiddleware, deactivateUser);

export default router;
