import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';

import NavBar from "./components/NavBar";
import CalendarPage from "./pages/CalendarPage";
import MarketplacePage from "./pages/MarketplacePage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";

import MapPage from "./pages/MapPage";
import DashboardContainer from "./components/DashboardContainer";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return <>{children}</>;
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className="pt-4">{children}</div>
        </>
    );
}

function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <DashboardContainer />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CalendarPage />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/marketplace"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <MarketplacePage />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/community"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CommunityPage />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <ProfilePage />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/map"
                        element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <MapPage />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default AppRoutes;
