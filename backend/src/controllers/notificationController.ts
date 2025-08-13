import { Request, Response } from 'express';
import { sendPushNotification } from '../services/notificationService';

// Example: POST /api/notify { token, title, body, data }
export async function sendNotification(req: Request, res: Response) {
  const { token, title, body, data } = req.body;
  if (!token || !title || !body) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }
  const result = await sendPushNotification(token, title, body, data);
  if (result.success) {
    res.json({ status: 'success', message: 'Notification sent', data: result.response });
  } else {
    res.status(500).json({ status: 'error', message: 'Failed to send notification', error: result.error });
  }
}
