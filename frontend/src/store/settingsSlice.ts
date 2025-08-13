import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
}

const initialState: SettingsState = {
    theme: 'light',
    notificationsEnabled: true
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<'light' | 'dark'>) {
            state.theme = action.payload;
        },
        setNotificationsEnabled(state, action: PayloadAction<boolean>) {
            state.notificationsEnabled = action.payload;
        }
    }
});

export const { setTheme, setNotificationsEnabled } = settingsSlice.actions;
export default settingsSlice.reducer;
