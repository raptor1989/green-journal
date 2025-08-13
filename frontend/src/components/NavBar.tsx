import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const nav = [
    { to: '/', label: 'Dashboard' },
    { to: '/calendar', label: 'Calendar' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/community', label: 'Community' },
    { to: '/profile', label: 'Profile' }
];

const NavBar: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <nav className="bg-green-700 text-white flex justify-center gap-4 py-2 shadow">
            {nav.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`px-3 py-1 rounded ${pathname === item.to ? 'bg-green-900' : ''}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavBar;
