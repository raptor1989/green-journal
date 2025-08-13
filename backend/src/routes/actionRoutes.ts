import { Router } from 'express';
import * as actionController from '../controllers/actionController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Get all actions (admin or for testing)
router.get('/', actionController.getAllActions);
// Get actions for current user
router.get('/me', authenticateJWT, actionController.getMyActions);
// Create new action (protected)
router.post('/', authenticateJWT, actionController.createAction);

export default router;
