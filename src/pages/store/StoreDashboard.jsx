// src/pages/store/StoreDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { useAuth } from '../../hooks/useAuth';
import { PackageCheck } from 'lucide-react';

const StoreDashboard = () => {
  const [unprocessedOrders, setUnprocessedOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const { user } = useAuth();

  const fetchData = async () => {
    const allOrders = await api.getPurchaseOrders();
    setUnprocessedOrders(allOrders.filter(o => o.status === 'ARRIVED'));
    const inv = await api.getInventory();
    setInventory(inv);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProcessOrder = async (poId) => {
    // In a real app, this would involve scanning QRs and assigning locations.
    // Here, we'll just mark it as completed.
    await api.updatePOStatus(poId, 'COMPLETED', user.name);
    // Refresh data
    fetchData();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Awaiting Storage Assignment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {unprocessedOrders.length > 0 ? unprocessedOrders.map((po) => (
          <div key={po.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold">{po.id}</h3>
            <p>Arrived on: {po.arrivalDate}</p>
            <p>Processed by Gate: {po.processedByGate}</p>
            <ul className="mt-2 text-sm list-disc list-inside">
              {po.items.map(item => <li key={item.productId}>{item.name} (x{item.quantity})</li>)}
            </ul>
            <button
              onClick={() => handleProcessOrder(po.id)}
              className="flex items-center gap-2 mt-4 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <PackageCheck size={16} />
              Process & Store
            </button>
          </div>
        )) : <p className="text-gray-500">No orders are awaiting storage.</p>}
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Current Inventory Overview</h2>
       <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Item Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Quantity</th>
              <th className="p-4 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.type === 'RAW_MATERIAL' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'}`}>
                        {item.type.replace('_', ' ')}
                    </span>
                </td>
                <td className="p-4">{item.quantity} {item.unit}</td>
                <td className="p-4 font-mono text-sm">{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreDashboard;