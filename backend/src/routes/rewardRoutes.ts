import { Router } from 'express';
import * as rewardController from '../controllers/rewardController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', rewardController.getAllRewards);
router.post('/', authenticateJWT, rewardController.createReward);

export default router;
