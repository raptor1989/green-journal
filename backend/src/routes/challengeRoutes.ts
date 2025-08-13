import { Router } from 'express';
import * as challengeController from '../controllers/challengeController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', challengeController.getAllChallenges);
router.post('/', authenticateJWT, challengeController.createChallenge);

export default router;
