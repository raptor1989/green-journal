import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  location: z.string().optional(),
});

export const actionCreateSchema = z.object({
  type: z.string().min(1),
  impact_score: z.number().int().min(1),
  date: z.string().datetime(),
});
// Add more schemas as needed

export const challengeCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  reward_points: z.number().int().min(1),
});

export const rewardCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cost_points: z.number().int().min(1),
  available: z.boolean().optional(),
});
