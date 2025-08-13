import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import userRoutes from './routes/userRoutes';

import actionRoutes from './routes/actionRoutes';
import challengeRoutes from './routes/challengeRoutes';
import rewardRoutes from './routes/rewardRoutes';
import userChallengeRoutes from './routes/userChallengeRoutes';
import userRewardRoutes from './routes/userRewardRoutes';

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/user-challenges', userChallengeRoutes);
app.use('/api/user-rewards', userRewardRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Green Journal API is running' });
});

export default app;
