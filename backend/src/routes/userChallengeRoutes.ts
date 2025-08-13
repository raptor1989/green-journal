import { Router } from 'express';
import * as userChallengeController from '../controllers/userChallengeController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

router.get('/me', authenticateFirebaseJWT, userChallengeController.getMyUserChallenges);
router.post('/:id/join', authenticateFirebaseJWT, userChallengeController.joinUserChallenge);
router.get('/', authenticateFirebaseJWT, userChallengeController.getMyUserChallenges);
router.post('/', authenticateFirebaseJWT, userChallengeController.createUserChallenge);
router.post('/:id/complete', authenticateFirebaseJWT, userChallengeController.completeUserChallenge);

export default router;
