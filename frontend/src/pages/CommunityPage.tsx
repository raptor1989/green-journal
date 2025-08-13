import React from 'react';
import Leaderboard from '../components/Leaderboard';

const CommunityPage: React.FC = () => (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
        <Leaderboard />
        <div className="bg-white rounded p-4 shadow">
            <h3 className="font-bold text-green-700 mb-2">Group Challenges (Coming Soon)</h3>
            <div className="text-gray-500">
                Collaborate with friends and the community to complete eco-challenges together!
            </div>
        </div>
    </div>
);

export default CommunityPage;
