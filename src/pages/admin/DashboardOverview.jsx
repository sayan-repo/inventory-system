// src/pages/admin/DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const DashboardOverview = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        api.getInventory().then(setInventory);
    }, []);

    // Data for Pie Chart (Inventory Breakdown by Type)
    const pieData = {
        labels: ['Raw Materials', 'Finished Products'],
        datasets: [{
            data: [
                inventory.filter(i => i.type === 'RAW_MATERIAL').length,
                inventory.filter(i => i.type === 'FINISHED_PRODUCT').length,
            ],
            backgroundColor: ['#f97316', '#10b981'],
        }],
    };

    // Data for Bar Chart (Stock Levels)
    const barData = {
        labels: inventory.map(i => i.name.slice(0, 15) + '...'), // Truncate long names
        datasets: [{
            label: 'Quantity',
            data: inventory.map(i => i.quantity),
            backgroundColor: '#3b82f6',
        }],
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Inventory Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4">Inventory Breakdown</h3>
                    <Pie data={pieData} />
                </div>
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4">Stock Levels per Item</h3>
                    <Bar data={barData} options={{ indexAxis: 'y', responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;