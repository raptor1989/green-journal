import React from 'react';




import { ToastProvider } from "./contexts/ToastContext";
import AppRoutes from "./AppRoutes";

function App() {
    return (
        <ToastProvider>
            <AppRoutes />
        </ToastProvider>
    );
}

export default App;



