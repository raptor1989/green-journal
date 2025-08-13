import React from 'react';
import { useAvailableRewards, useClaimReward } from '../utils/queries';
import { useToast } from '../contexts/ToastContext';

const RewardsMarketplace: React.FC = () => {
  const { data, isLoading } = useAvailableRewards();
  const toast = useToast();
  const claimReward = useClaimReward();


  React.useEffect(() => {
    if (claimReward.isSuccess) toast.showToast('Reward claimed!', 'success');
    if (claimReward.isError) toast.showToast('Failed to claim reward', 'error');
    // eslint-disable-next-line
  }, [claimReward.isSuccess, claimReward.isError]);

    React.useEffect(() => {
    if (claimReward.isSuccess) toast.showToast('Reward claimed!', 'success');
    if (claimReward.isError) toast.showToast('Failed to claim reward', 'error');
    // eslint-disable-next-line
  }, [claimReward.isSuccess, claimReward.isError]);

  if (isLoading) return <div>Loading rewards...</div>;

  const rewards = (data as any)?.data ?? [];

  return (
    <div className="bg-white rounded p-4 shadow space-y-2">
      <h3 className="font-bold text-green-700 mb-2">Eco-Marketplace</h3>
      {rewards.length === 0 && <div>No rewards available.</div>}
      {rewards.map((reward: any) => (
        <div key={reward.id} className="flex items-center justify-between border-b py-2">
          <div>
            <div className="font-semibold">{reward.title}</div>
            <div className="text-xs text-gray-500">{reward.description}</div>
            <div className="text-xs text-green-700">Cost: {reward.cost_points} pts</div>
          </div>
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
            onClick={() => claimReward.mutate(reward.id)}
            disabled={claimReward.status === 'pending'}
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default RewardsMarketplace;
