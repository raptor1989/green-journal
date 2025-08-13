// GET /api/actions/summary
export async function getActionSummary(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userId = req.user.localId || req.user.id;
  const actions = await prisma.action.findMany({ where: { user_id: userId } });
  const totalImpact = actions.reduce(
    (sum: number, a: { impact_score: number; date: Date }) => sum + a.impact_score,
    0,
  );
  const count = actions.length;
  // Simple streak: count of unique days with actions
  const streak = new Set(actions.map((a: { date: Date }) => a.date.toISOString().slice(0, 10)))
    .size;
  res.json({ status: 'success', message: 'Summary fetched', data: { totalImpact, count, streak } });
}

// GET /api/actions/calendar
export async function getActionCalendar(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const userId = req.user.localId || req.user.id;
  const actions = await prisma.action.findMany({ where: { user_id: userId } });
  // Group by date (YYYY-MM-DD)
  const calendar: Record<string, any[]> = {};
  actions.forEach((a: { date: Date }) => {
    const day = a.date.toISOString().slice(0, 10);
    if (!calendar[day]) calendar[day] = [];
    calendar[day].push(a);
  });
  res.json({ status: 'success', message: 'Calendar fetched', data: calendar });
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';
import { actionCreateSchema } from '../models/validation';

const prisma = new PrismaClient();

export async function getAllActions(_req: Request, res: Response) {
  const actions = await prisma.action.findMany();
  res.json({ status: 'success', message: 'Actions fetched', data: actions });
}

export async function getMyActions(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const actions = await prisma.action.findMany({ where: { user_id: req.user.id } });
  res.json({ status: 'success', message: 'User actions fetched', data: actions });
}

export async function createAction(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  const parse = actionCreateSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid data', data: parse.error.issues });
  }
  const action = await prisma.action.create({
    data: {
      ...parse.data,
      user_id: req.user.id,
      date: new Date(parse.data.date),
    },
  });
  res.status(201).json({ status: 'success', message: 'Action created', data: action });
}
