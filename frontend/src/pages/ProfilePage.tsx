import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/userSlice';
import { apiFetch } from '../utils/api';

const ProfilePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user as import('../store/userSlice').UserState);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const nameRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);

    // Fetch user data on mount if not loaded
    React.useEffect(() => {
        if (!user.id) {
            apiFetch('/api/users/me')
                .then((res) => {
                    const data = (
                        res as { data: { id: string; name: string; email: string; points: number; location?: string } }
                    ).data;
                    if (data) {
                        dispatch(
                            setUser({
                                id: data.id,
                                name: data.name,
                                email: data.email,
                                points: data.points || 0,
                                location: data.location || ''
                            })
                        );
                    }
                })
                .catch(() => setError('Failed to load user'));
        }
    }, [user.id, dispatch]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const updated: { data: { id: string; name: string; email: string; points: number; location?: string } } =
                await apiFetch('/api/users/me', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: nameRef.current?.value,
                        location: locationRef.current?.value
                    })
                });
            if (updated && updated.data) {
                dispatch(
                    setUser({
                        id: updated.data.id,
                        name: updated.data.name,
                        email: updated.data.email,
                        points: updated.data.points || 0,
                        location: updated.data.location || ''
                    })
                );
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) return;
        try {
            await apiFetch('/api/users/me', { method: 'DELETE' });
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (!user.id) return <div>Loading profile...</div>;

    return (
        <div className="max-w-md mx-auto bg-white rounded p-4 shadow mt-8">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleUpdate} className="space-y-2">
                <div>
                    <label className="block text-sm">Name</label>
                    <input ref={nameRef} defaultValue={user.name || ''} className="border p-2 rounded w-full" />
                </div>
                <div>
                    <label className="block text-sm">Location</label>
                    <input ref={locationRef} defaultValue={user.location || ''} className="border p-2 rounded w-full" />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
            <button onClick={handleDelete} className="mt-4 text-red-600 underline">
                Delete Account
            </button>
        </div>
    );
};

export default ProfilePage;
