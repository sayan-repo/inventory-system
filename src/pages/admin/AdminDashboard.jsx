// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { Users, Package, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
    <div className="p-6 bg-white rounded-lg shadow flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const AdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, inventoryCount: 0, pendingOrders: 0 });
    
    useEffect(() => {
        const fetchStats = async () => {
            const users = await api.getUsers();
            const inventory = await api.getInventory();
            const orders = await api.getPurchaseOrders();
            setStats({
                userCount: users.length,
                inventoryCount: inventory.length,
                pendingOrders: orders.filter(o => o.status === 'PENDING_ARRIVAL').length,
            });
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Users" 
                    value={stats.userCount} 
                    icon={<Users className="text-blue-800" />}
                    color="bg-blue-100" 
                />
                <StatCard 
                    title="Total Inventory Items" 
                    value={stats.inventoryCount} 
                    icon={<Package className="text-green-800" />}
                    color="bg-green-100" 
                />
                <StatCard 
                    title="Pending Arrivals" 
                    value={stats.pendingOrders} 
                    icon={<AlertTriangle className="text-yellow-800" />}
                    color="bg-yellow-100" 
                />
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Recent Activity (Placeholder)</h3>
                <div className="p-6 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Activity log would be displayed here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;