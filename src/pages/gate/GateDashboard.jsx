import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { useAuth } from '../../hooks/useAuth';
import DownloadableQR from '../../components/DownloadableQR'; 
import { PackagePlus } from 'lucide-react';

const GateDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await api.getPurchaseOrders();
      setOrders(allOrders.filter(o => ['PENDING_ARRIVAL', 'ARRIVED'].includes(o.status)));
    };
    fetchOrders();
  }, []);

  const handleMarkArrived = async (poId) => {
    await api.updatePOStatus(poId, 'ARRIVED', user.name);
    const updatedOrders = await api.getPurchaseOrders();
    setOrders(updatedOrders.filter(o => ['PENDING_ARRIVAL', 'ARRIVED'].includes(o.status)));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pending & Recent Arrivals</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((po) => (
          <div key={po.id} className="p-4 bg-white rounded-lg border shadow-sm">
            <h3 className="font-bold text-gray-800">{po.id}</h3>
            <p className="text-sm">Status: <span className={`font-semibold ${po.status === 'ARRIVED' ? 'text-green-600' : 'text-yellow-600'}`}>{po.status.replace('_', ' ')}</span></p>
            <ul className="mt-2 text-sm list-disc list-inside text-gray-600">
              {po.items.map(item => <li key={item.productId}>{item.name} (x{item.quantity})</li>)}
            </ul>
            <div className="mt-4 flex gap-2">
              {po.status === 'PENDING_ARRIVAL' && (
                <button onClick={() => handleMarkArrived(po.id)} className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                  <PackagePlus size={16} /> Mark Arrived
                </button>
              )}
               <button onClick={() => setSelectedOrder(po)} className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  Generate QRs
               </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal using the new DownloadableQR component */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-xl max-w-3xl w-full">
                <h3 className="text-xl font-bold mb-4">Print QR Labels for {selectedOrder.id}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-4 border rounded bg-gray-50">
                    {selectedOrder.items.map(item => {
                        const qrValue = `PO:${selectedOrder.id};PROD:${item.productId};QTY:${item.quantity}`;
                        return (
                            <DownloadableQR
                                key={item.productId}
                                value={qrValue}
                                title={`${item.name} (x${item.quantity})`}
                            />
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