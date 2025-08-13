import { Router } from 'express';
import * as userRewardController from '../controllers/userRewardController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateJWT, userRewardController.getMyUserRewards);
router.post('/', authenticateJWT, userRewardController.claimReward);

export default router;
