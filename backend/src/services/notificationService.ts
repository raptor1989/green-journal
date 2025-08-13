import admin from 'firebase-admin';

// You can use applicationDefault() or a service account key JSON file
// admin.initializeApp({
//   credential: admin.credential.cert(require('../../serviceAccountKey.json')),
// });

export async function sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
  const message = {
    notification: { title, body },
    token,
    data,
  };
  try {
    const response = await admin.messaging().send(message);
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
}
