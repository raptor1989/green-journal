import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

router.get('/leaderboard', userController.getLeaderboard);

// Public: Get all users
router.get('/', userController.getAllUsers);

// Protected: Get current user profile
router.get('/me', authenticateFirebaseJWT, userController.getCurrentUser);
router.patch('/me', authenticateFirebaseJWT, userController.updateCurrentUser);
router.delete('/me', authenticateFirebaseJWT, userController.deleteCurrentUser);

export default router;
