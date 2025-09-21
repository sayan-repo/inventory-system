// src/pages/gate/GateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { useAuth } from '../../hooks/useAuth';
import { QRCodeSVG } from 'qrcode.react';

const GateDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await api.getPurchaseOrders();
      // Gate manager sees orders that are PENDING_ARRIVAL or ARRIVED
      setOrders(allOrders.filter(o => ['PENDING_ARRIVAL', 'ARRIVED'].includes(o.status)));
    };
    fetchOrders();
  }, []);

  const handleMarkArrived = async (poId) => {
    await api.updatePOStatus(poId, 'ARRIVED', user.name);
    // Refresh the list
    const updatedOrders = await api.getPurchaseOrders();
    setOrders(updatedOrders.filter(o => ['PENDING_ARRIVAL', 'ARRIVED'].includes(o.status)));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pending & Recent Arrivals</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {orders.map((po) => (
          <div key={po.id} className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-bold">{po.id}</h3>
            <p>Status: <span className={`font-semibold ${po.status === 'ARRIVED' ? 'text-green-600' : 'text-yellow-600'}`}>{po.status.replace('_', ' ')}</span></p>
            <p>Items: {po.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
            <div className="mt-4 flex gap-2">
              {po.status === 'PENDING_ARRIVAL' && (
                <button onClick={() => handleMarkArrived(po.id)} className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                  Mark as Arrived
                </button>
              )}
               <button onClick={() => setSelectedOrder(po)} className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  Generate QRs
               </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal for QR Code Generation */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <h3 className="text-xl font-bold mb-4">QR Codes for {selectedOrder.id}</h3>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto p-4 border rounded">
                    {selectedOrder.items.map(item => {
                        const qrValue = `PO:${selectedOrder.id};PROD:${item.productId};QTY:${item.quantity}`;
                        return (
                            <div key={item.productId} className="text-center p-2 border rounded">
                                <p className="font-semibold">{item.name}</p>
                                <div className="flex justify-center my-2">
                                    <QRCodeSVG value={qrValue} size={128} />
                                </div>
                                <p className="text-xs break-all">{qrValue}</p>
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => setSelectedOrder(null)} className="mt-6 w-full py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                    Close
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default GateDashboard;

// You would create similar dashboards for Admin, Purchase, Store, and Outgoing managers
// For example, PurchaseDashboard would have a form to create new Purchase Orders.
// StoreDashboard would have a list of ARRIVED orders and a feature to scan a QR and assign a rack number.