// GET /api/rewards/available
export async function getAvailableRewards(_req: Request, res: Response) {
  const rewards = await prisma.reward.findMany({ where: { available: true } });
  res.json({ status: 'success', message: 'Available rewards fetched', data: rewards });
}

// POST /api/rewards/:id/claim
import { AuthRequest } from '../middlewares/auth';
export async function claimReward(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userId = req.user.localId || req.user.id;
  const rewardId = Number(req.params.id);
  if (!rewardId) return res.status(400).json({ status: 'error', message: 'Missing reward id' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  if (!user || !reward || !reward.available)
    return res.status(404).json({ status: 'error', message: 'Reward not found or unavailable' });
  if (user.points < reward.cost_points)
    return res.status(400).json({ status: 'error', message: 'Not enough points' });
  await prisma.user.update({
    where: { id: userId },
    data: { points: { decrement: reward.cost_points } },
  });
  await prisma.userReward.create({
    data: { user_id: userId, reward_id: rewardId, date_claimed: new Date() },
  });
  res.json({ status: 'success', message: 'Reward claimed' });
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { rewardCreateSchema } from '../models/validation';

const prisma = new PrismaClient();

export async function getAllRewards(_req: Request, res: Response) {
  const rewards = await prisma.reward.findMany();
  res.json({ status: 'success', message: 'Rewards fetched', data: rewards });
}

export async function createReward(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const parse = rewardCreateSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid data', data: parse.error.issues });
  }
  const reward = await prisma.reward.create({ data: parse.data });
  res.status(201).json({ status: 'success', message: 'Reward created', data: reward });
}
