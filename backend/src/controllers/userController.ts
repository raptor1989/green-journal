// GET /api/users/leaderboard
export async function getLeaderboard(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 10,
    select: { id: true, name: true, points: true },
  });
  res.json({ status: 'success', message: 'Leaderboard fetched', data: users });
}

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function getAllUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json({ status: 'success', message: 'Users fetched', data: users });
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  const user = await prisma.user.findUnique({ where: { id: req.user.localId || req.user.id } });
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }
  res.json({ status: 'success', message: 'User profile', data: user });
}

// PATCH /api/users/me
export async function updateCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  const schema = z.object({
    name: z.string().min(1).optional(),
    location: z.string().optional(),
  });
  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid data', data: parse.error.issues });
  }
  const user = await prisma.user.update({
    where: { id: req.user.localId || req.user.id },
    data: parse.data,
  });
  res.json({ status: 'success', message: 'User updated', data: user });
}

// DELETE /api/users/me
export async function deleteCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  await prisma.user.delete({ where: { id: req.user.localId || req.user.id } });
  res.json({ status: 'success', message: 'User deleted' });
}
