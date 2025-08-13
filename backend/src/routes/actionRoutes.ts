import { Router } from 'express';
import * as actionController from '../controllers/actionController';
import { authenticateFirebaseJWT } from '../middlewares/firebaseAuth';

const router = Router();

// Get all actions (admin or for testing)
router.get('/', actionController.getAllActions);
// Get actions for current user
router.get('/me', authenticateFirebaseJWT, actionController.getMyActions);
// Create new action (protected)
router.post('/', authenticateFirebaseJWT, actionController.createAction);
router.get('/summary', authenticateFirebaseJWT, actionController.getActionSummary);
router.get('/calendar', authenticateFirebaseJWT, actionController.getActionCalendar);

export default router;
