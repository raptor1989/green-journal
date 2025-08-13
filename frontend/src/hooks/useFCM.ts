import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '../firebase';

const VAPID_KEY = 'YOUR_PUBLIC_VAPID_KEY'; // Get from Firebase Console > Project Settings > Cloud Messaging

export function useFCM(onNotification: (payload: any) => void) {
    useEffect(() => {
        if (!messaging) return;
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                getToken(messaging!, { vapidKey: VAPID_KEY })
                    .then((currentToken) => {
                        if (currentToken) {
                            // Send this token to your backend to save for this user
                            console.log('FCM Token:', currentToken);
                        }
                    })
                    .catch(console.error);
            }
        });
        onMessage(messaging!, (payload) => {
            onNotification(payload);
        });
    }, [onNotification]);
}
