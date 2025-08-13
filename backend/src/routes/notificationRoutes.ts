import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController';

const router = Router();

// POST /api/notify
router.post('/notify', sendNotification);

export default router;
