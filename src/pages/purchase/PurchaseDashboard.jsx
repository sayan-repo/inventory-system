// src/pages/purchase/PurchaseDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { useAuth } from '../../hooks/useAuth';
import { PlusCircle } from 'lucide-react';

const PurchaseDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1 });
  const { user } = useAuth();

  useEffect(() => {
    api.getPurchaseOrders().then(setOrders);
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!newItem.name || newItem.quantity <= 0) return;

    const orderData = {
      createdBy: user.name,
      creationDate: new Date().toISOString().split('T')[0],
      items: [{
        productId: `NEW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        name: newItem.name,
        quantity: Number(newItem.quantity)
      }],
      arrivalDate: null,
      processedByGate: null,
      processedByStore: null,
    };

    const result = await api.createPurchaseOrder(orderData);
    if (result.success) {
      setOrders(prevOrders => [...prevOrders, result.order]);
      setShowForm(false);
      setNewItem({ name: '', quantity: 1 });
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
        case 'COMPLETED': return 'text-green-600 bg-green-100';
        case 'ARRIVED': return 'text-blue-600 bg-blue-100';
        case 'PROCESSED': return 'text-purple-600 bg-purple-100';
        case 'PENDING_ARRIVAL': return 'text-yellow-600 bg-yellow-100';
        default: return 'text-gray-600 bg-gray-100';
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Purchase Orders</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <PlusCircle size={20} />
          Create New Order
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Items</th>
              <th className="p-4 font-semibold">Created By</th>
              <th className="p-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((po) => (
              <tr key={po.id} className="border-t">
                <td className="p-4 font-medium">{po.id}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(po.status)}`}>
                    {po.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">{po.items.map(item => item.name).join(', ')}</td>
                <td className="p-4">{po.createdBy}</td>
                <td className="p-4">{po.creationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Order Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Purchase Order</h3>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  placeholder="e.g., Grade B Aluminum Sheets"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseDashboard;