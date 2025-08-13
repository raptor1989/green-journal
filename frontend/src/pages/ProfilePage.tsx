import React, { useRef, useState } from 'react';
import { apiFetch } from '../utils/api';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    apiFetch('/api/users/me').then(setUser).finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const updated = await apiFetch('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
          name: nameRef.current?.value,
          location: locationRef.current?.value,
        }),
      });
      setUser(updated);
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

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Profile not found.</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded p-4 shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleUpdate} className="space-y-2">
        <div>
          <label className="block text-sm">Name</label>
          <input ref={nameRef} defaultValue={user.data?.name} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <input ref={locationRef} defaultValue={user.data?.location} className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
      <button onClick={handleDelete} className="mt-4 text-red-600 underline">Delete Account</button>
    </div>
  );
};

export default ProfilePage;
