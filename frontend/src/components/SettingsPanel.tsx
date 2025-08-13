import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTheme, setNotificationsEnabled } from '../store/settingsSlice';

const SettingsPanel: React.FC = () => {
    const settings = useSelector(
        (state: RootState) => state.settings as { theme: 'light' | 'dark'; notificationsEnabled: boolean }
    );
    const dispatch = useDispatch();

    return (
        <div className="bg-white rounded p-4 shadow max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
                <label className="block text-sm mb-1">Theme</label>
                <select
                    value={settings.theme}
                    onChange={(e) => dispatch(setTheme(e.target.value as 'light' | 'dark'))}
                    className="border p-2 rounded w-full"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={settings.notificationsEnabled}
                        onChange={(e) => dispatch(setNotificationsEnabled(e.target.checked))}
                    />
                    Enable Notifications
                </label>
            </div>
        </div>
    );
};

export default SettingsPanel;
