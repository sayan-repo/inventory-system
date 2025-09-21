// src/pages/outgoing/OutgoingDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { Send } from 'lucide-react';

const OutgoingDashboard = () => {
  const [dispatchableInventory, setDispatchableInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const allInventory = await api.getInventory();
      // Outgoing manager only deals with finished products
      setDispatchableInventory(allInventory.filter(item => item.type === 'FINISHED_PRODUCT'));
    };
    fetchInventory();
  }, []);
  
  const handleDispatch = (itemId) => {
    // In a real app, this would decrease quantity and log the transaction
    alert(`Dispatching item ID: ${itemId}. This would be a logged event.`);
    // Here we'll just filter it from the view for demo purposes
    setDispatchableInventory(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Finished Goods Inventory - Ready for Dispatch</h2>
       <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Product Name</th>
              <th className="p-4 font-semibold">Quantity Available</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dispatchableInventory.length > 0 ? dispatchableInventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.quantity} {item.unit}</td>
                <td className="p-4 font-mono text-sm">{item.location}</td>
                <td className="p-4">
                    <button
                        onClick={() => handleDispatch(item.id)}
                        className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        <Send size={16} />
                        Dispatch
                    </button>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">No finished products are currently in inventory.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutgoingDashboard;