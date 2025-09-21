// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Import Layout
import Layout from '../components/layout/Layout';

import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

// Dummy components for routes
const ComingSoon = ({ pageName }) => <div className="text-3xl font-bold">{pageName} - Coming Soon</div>;

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        
        {/* Protected Dashboard Routes now use the main Layout */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'PURCHASE_MANAGER', 'GATE_MANAGER', 'STORE_MANAGER', 'OUTGOING_MANAGER']} />}>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                {/* Add more specific routes. Ensure paths match the sidebar links. */}
                <Route path="/users" element={<ComingSoon pageName="User Management"/>} />
                <Route path="/purchase" element={<ComingSoon pageName="Purchase Orders"/>} />
                <Route path="/gate" element={<ComingSoon pageName="Arrivals"/>} />
                <Route path="/store" element={<ComingSoon pageName="Inventory"/>} />
                <Route path="/outgoing" element={<ComingSoon pageName="Dispatch"/>} />
            </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};