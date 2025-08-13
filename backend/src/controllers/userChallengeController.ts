// POST /api/user-challenges/:id/join
export async function joinUserChallenge(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userId = req.user.localId || req.user.id;
  const challengeId = Number(req.params.id);
  if (!challengeId)
    return res.status(400).json({ status: 'error', message: 'Missing challenge id' });
  // Prevent duplicate join
  const existing = await prisma.userChallenge.findFirst({
    where: { user_id: userId, challenge_id: challengeId },
  });
  if (existing) return res.status(400).json({ status: 'error', message: 'Already joined' });
  const userChallenge = await prisma.userChallenge.create({
    data: { user_id: userId, challenge_id: challengeId, status: 'active' },
  });
  res.status(201).json({ status: 'success', message: 'Joined challenge', data: userChallenge });
}
// POST /api/user-challenges/:id/complete
export async function completeUserChallenge(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userId = req.user.localId || req.user.id;
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'Missing challenge id' });
  const userChallenge = await prisma.userChallenge.update({
    where: { id },
    data: { status: 'completed' },
  });
  res.json({ status: 'success', message: 'Challenge marked as completed', data: userChallenge });
}
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
  res
    .status(201)
    .json({ status: 'success', message: 'User challenge created', data: userChallenge });
}
