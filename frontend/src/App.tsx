import React from 'react';


import DashboardContainer from "./components/DashboardContainer";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-green-600 text-white p-4 text-center font-bold text-xl shadow">Green Journal</header>
            <main className="py-8">
                <DashboardContainer />
            </main>
        </div>
    );
}

export default App;

