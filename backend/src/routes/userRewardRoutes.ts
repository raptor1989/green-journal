import { Router } from 'express';
import * as userRewardController from '../controllers/userRewardController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

router.get('/', authenticateFirebaseJWT, userRewardController.getMyUserRewards);
router.post('/', authenticateFirebaseJWT, userRewardController.claimReward);

export default router;
