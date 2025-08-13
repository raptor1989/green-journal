import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { apiFetch } from '../utils/api';

const DashboardContainer: React.FC = () => {
    const [dailyChallenge, setDailyChallenge] = useState('');
    const [progress, setProgress] = useState(0);
    const [greenFact, setGreenFact] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        Promise.all([
            apiFetch<{ data: any }>('/api/challenges'),
            apiFetch<{ data: any }>('/api/users/me'),
            apiFetch<{ data: string }>('https://green-facts-api.vercel.app/api/fact')
        ])
            .then(([challenges, user, fact]) => {
                setDailyChallenge(challenges.data[0]?.title || 'No challenge today');
                setProgress(user.data?.points || 0);
                setGreenFact(fact.data || 'Every action counts!');
            })
            .catch((err) => setError('Failed to load dashboard data.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-8">Loading dashboard...</div>;
    if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;
    return <Dashboard dailyChallenge={dailyChallenge} progress={progress} greenFact={greenFact} />;
};

export default DashboardContainer;
