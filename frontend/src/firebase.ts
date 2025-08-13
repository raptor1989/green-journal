// Firebase config for Green Journal (replace with your own project settings)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    appId: "YOUR_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Messaging (FCM)
export let messaging: ReturnType<typeof getMessaging> | null = null;
isSupported().then((supported) => {
    if (supported) {
        messaging = getMessaging(app);
    }
});
export { getToken, onMessage };
