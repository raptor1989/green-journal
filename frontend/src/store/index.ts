import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notificationReducer from './notificationSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationReducer,
        settings: settingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
