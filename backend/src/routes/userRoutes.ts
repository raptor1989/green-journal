import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Public: Get all users
router.get('/', userController.getAllUsers);

// Protected: Get current user profile
router.get('/me', authenticateJWT, userController.getCurrentUser);

export default router;
