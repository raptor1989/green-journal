import notificationRoutes from './routes/notificationRoutes';
import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import userRoutes from './routes/userRoutes';

import actionRoutes from './routes/actionRoutes';
import challengeRoutes from './routes/challengeRoutes';
import rewardRoutes from './routes/rewardRoutes';
import userChallengeRoutes from './routes/userChallengeRoutes';
import userRewardRoutes from './routes/userRewardRoutes';

// Load environment variables from .env
dotenv.config();

const app = express();

// Security middlewares
app.use(helmet());
app.use(xss());

// Rate limiting (e.g., 100 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use(json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/user-challenges', userChallengeRoutes);
app.use('/api/user-rewards', userRewardRoutes);
app.use('/api', notificationRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Green Journal API is running' });
});

export default app;
