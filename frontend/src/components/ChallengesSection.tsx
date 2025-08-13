import React from 'react';
import { useActiveChallenges, useJoinChallenge, useCompleteChallenge } from '../utils/queries';

const ChallengesSection: React.FC = () => {
  const { data, isLoading } = useActiveChallenges();
  const joinChallenge = useJoinChallenge();
  const completeChallenge = useCompleteChallenge();

  if (isLoading) return <div>Loading challenges...</div>;

  const challenges = (data as any)?.data ?? [];

  return (
    <div className="bg-white rounded p-4 shadow space-y-2">
      <h3 className="font-bold text-green-700 mb-2">Active Challenges</h3>
      {challenges.length === 0 && <div>No active challenges.</div>}
      {challenges.map((ch: any) => (
        <div key={ch.id} className="flex items-center justify-between border-b py-2">
          <div>
            <div className="font-semibold">{ch.title}</div>
            <div className="text-xs text-gray-500">{ch.description}</div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              onClick={() => joinChallenge.mutate(ch.id)}
              disabled={joinChallenge.status === 'pending'}
            >
              Join
            </button>
            <button
              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
              onClick={() => completeChallenge.mutate(ch.id)}
              disabled={completeChallenge.status === 'pending'}
            >
              Complete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesSection;
