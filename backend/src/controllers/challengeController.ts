// GET /api/challenges/active
export async function getActiveChallenges(_req: Request, res: Response) {
  const now = new Date();
  const challenges = await prisma.challenge.findMany({
    where: {
      start_date: { lte: now },
      end_date: { gte: now },
    },
  });
  res.json({ status: 'success', message: 'Active challenges fetched', data: challenges });
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { challengeCreateSchema } from '../models/validation';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function getAllChallenges(_req: Request, res: Response) {
  const challenges = await prisma.challenge.findMany();
  res.json({ status: 'success', message: 'Challenges fetched', data: challenges });
}

export async function createChallenge(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const parse = challengeCreateSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid data', data: parse.error.issues });
  }
  const challenge = await prisma.challenge.create({ data: parse.data });
  res.status(201).json({ status: 'success', message: 'Challenge created', data: challenge });
}
