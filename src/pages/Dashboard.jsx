// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

// Import Role-Specific Dashboard Components
import AdminDashboard from './admin/AdminDashboard';
import PurchaseDashboard from './purchase/PurchaseDashboard';
import GateDashboard from './gate/GateDashboard';
import StoreDashboard from './store/StoreDashboard';
import OutgoingDashboard from './outgoing/OutgoingDashboard';

const roleToComponent = {
  ADMIN: <AdminDashboard />,
  PURCHASE_MANAGER: <PurchaseDashboard />,
  GATE_MANAGER: <GateDashboard />,
  STORE_MANAGER: <StoreDashboard />,
  OUTGOING_MANAGER: <OutgoingDashboard />,
};

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          <p className="text-gray-500">Your role: {user.role.replace('_', ' ')}</p>
        </div>
        <button onClick={logout} className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Render the specific dashboard for the user's role */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        {roleToComponent[user.role] || <p>No dashboard available for your role.</p>}
      </div>
    </div>
  );
};

export default Dashboard;