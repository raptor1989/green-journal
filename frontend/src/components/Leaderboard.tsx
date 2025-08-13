import React from 'react';
import { useLeaderboard } from '../utils/queries';

const Leaderboard: React.FC = () => {
    const { data, isLoading } = useLeaderboard();
    const users = (data as any)?.data ?? [];

    if (isLoading) return <div>Loading leaderboard...</div>;

    return (
        <div className="bg-white rounded p-4 shadow">
            <h3 className="font-bold text-green-700 mb-2">Leaderboard</h3>
            <ol className="list-decimal pl-4">
                {users.map((user: any, idx: number) => (
                    <li key={user.id} className="mb-1">
                        <span className="font-semibold">{user.name}</span> —{' '}
                        <span className="text-green-700">{user.points} pts</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
