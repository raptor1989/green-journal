import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function getMyUserChallenges(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userChallenges = await prisma.userChallenge.findMany({
    where: { user_id: req.user.id },
    include: { challenge: true },
  });
  res.json({ status: 'success', message: 'User challenges fetched', data: userChallenges });
}

export async function createUserChallenge(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const { challenge_id, status } = req.body;
  if (!challenge_id || !status) {
    return res.status(400).json({ status: 'error', message: 'Missing challenge_id or status' });
  }
  const userChallenge = await prisma.userChallenge.create({
    data: {
      user_id: req.user.id,
      challenge_id,
      status,
    },
  });
  res.status(201).json({ status: 'success', message: 'User challenge created', data: userChallenge });
}
