import React from 'react';

interface DashboardProps {
    dailyChallenge: string;
    progress: number; // 0-100
    greenFact: string;
}

const Dashboard: React.FC<DashboardProps> = ({ dailyChallenge, progress, greenFact }) => {
    return (
        <div className="max-w-xl mx-auto p-4 space-y-6">
            <section className="bg-green-100 rounded-lg p-4 shadow">
                <h2 className="text-lg font-bold text-green-800 mb-2">🌱 Daily Challenge</h2>
                <p className="text-green-900">{dailyChallenge}</p>
            </section>
            <section className="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                <h2 className="text-lg font-bold text-gray-700 mb-2">Your Progress</h2>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-green-700 font-semibold">{progress}%</span>
            </section>
            <section className="bg-blue-50 rounded-lg p-4 shadow">
                <h2 className="text-lg font-bold text-blue-700 mb-2">🌍 Green Fact of the Day</h2>
                <p className="text-blue-900">{greenFact}</p>
            </section>
        </div>
    );
};

export default Dashboard;
