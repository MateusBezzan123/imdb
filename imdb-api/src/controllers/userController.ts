import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models/prismaClient';
import handleValidationErrors from '../utils/handleValidationErrors';

export const register = async (req: Request, res: Response) => {
  handleValidationErrors(req, res);

  const { name, email, password, role } = req.body;
  const { user } = req as any;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new users' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  handleValidationErrors(req, res);

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
  }
};

export const editUser = async (req: Request, res: Response) => {
  handleValidationErrors(req, res);

  const { id } = req.params;
  const { name, email } = req.body;
  const { user } = req as any;

  if (user.id !== Number(id) && user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;

  if (user.id !== Number(id) && user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { active: false },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error: (error as Error).message });
  }
};
