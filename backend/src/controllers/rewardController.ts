import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { rewardCreateSchema } from '../models/validation';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function getAllRewards(_req: Request, res: Response) {
  const rewards = await prisma.reward.findMany();
  res.json({ status: 'success', message: 'Rewards fetched', data: rewards });
}

export async function createReward(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const parse = rewardCreateSchema.safeParse(req.body);
  if (!parse.success) {
  return res.status(400).json({ status: 'error', message: 'Invalid data', data: parse.error.issues });
  }
  const reward = await prisma.reward.create({ data: parse.data });
  res.status(201).json({ status: 'success', message: 'Reward created', data: reward });
}
