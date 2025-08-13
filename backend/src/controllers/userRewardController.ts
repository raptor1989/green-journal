import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function getMyUserRewards(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userRewards = await prisma.userReward.findMany({
    where: { user_id: req.user.id },
    include: { reward: true },
  });
  res.json({ status: 'success', message: 'User rewards fetched', data: userRewards });
}

export async function claimReward(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const { reward_id } = req.body;
  if (!reward_id) {
    return res.status(400).json({ status: 'error', message: 'Missing reward_id' });
  }
  const userReward = await prisma.userReward.create({
    data: {
      user_id: req.user.id,
      reward_id,
      date_claimed: new Date(),
    },
  });
  res.status(201).json({ status: 'success', message: 'Reward claimed', data: userReward });
}
