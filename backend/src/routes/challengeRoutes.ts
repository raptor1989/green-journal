import { Router } from 'express';
import * as challengeController from '../controllers/challengeController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

router.get('/', challengeController.getAllChallenges);
router.get('/active', challengeController.getActiveChallenges);
router.post('/', authenticateFirebaseJWT, challengeController.createChallenge);

export default router;
