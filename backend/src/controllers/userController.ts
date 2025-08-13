import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function getAllUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json({ status: 'success', message: 'Users fetched', data: users });
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }
  res.json({ status: 'success', message: 'User profile', data: user });
}
