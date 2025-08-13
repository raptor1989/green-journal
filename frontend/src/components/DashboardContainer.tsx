import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { apiFetch } from '../utils/api';

const DashboardContainer: React.FC = () => {
  const [dailyChallenge, setDailyChallenge] = useState('');
  const [progress, setProgress] = useState(0);
  const [greenFact, setGreenFact] = useState('');

  useEffect(() => {
    // Example API calls (replace endpoints as needed)
    apiFetch<{ data: any }>('http://localhost:4000/api/challenges')
      .then((res) => setDailyChallenge(res.data[0]?.title || 'No challenge today'));
    apiFetch<{ data: any }>('http://localhost:4000/api/users/me')
      .then((res) => setProgress(res.data?.points || 0));
    apiFetch<{ data: string }>('https://green-facts-api.vercel.app/api/fact')
      .then((res) => setGreenFact(res.data || 'Every action counts!'));
  }, []);

  return (
    <Dashboard dailyChallenge={dailyChallenge} progress={progress} greenFact={greenFact} />
  );
};

export default DashboardContainer;
