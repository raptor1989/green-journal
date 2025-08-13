import { Router } from 'express';
import * as rewardController from '../controllers/rewardController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

router.get('/', rewardController.getAllRewards);
router.get('/available', rewardController.getAvailableRewards);
router.post('/:id/claim', authenticateFirebaseJWT, rewardController.claimReward);
router.post('/', authenticateFirebaseJWT, rewardController.createReward);

export default router;
