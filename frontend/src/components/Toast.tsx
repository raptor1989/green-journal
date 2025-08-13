import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeNotification } from '../store/notificationSlice';

const Toast: React.FC = () => {
    const notifications = useSelector(
        (state: RootState) =>
            (state.notifications as import('../store/notificationSlice').NotificationState).notifications
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                dispatch(removeNotification(notifications[0].id));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notifications, dispatch]);

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((toast: import('../store/notificationSlice').Notification) => (
                <div
                    key={toast.id}
                    className={`px-4 py-2 rounded shadow text-white ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default Toast;
