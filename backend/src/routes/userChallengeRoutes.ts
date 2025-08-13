import { Router } from 'express';
import * as userChallengeController from '../controllers/userChallengeController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateJWT, userChallengeController.getMyUserChallenges);
router.post('/', authenticateJWT, userChallengeController.createUserChallenge);

export default router;
