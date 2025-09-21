import React, { useState, useEffect } from 'react';
import { api } from '../../api/mockApi';
import { useAuth } from '../../hooks/useAuth';
import { PackageCheck, QrCode } from 'lucide-react';
import WarehouseVisualizer from '../../components/WarehouseVisualizer'; 
import QRScanner from '../../components/QRScanner'; 

const StoreDashboard = () => {
  const [unprocessedOrders, setUnprocessedOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
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
    await api.updatePOStatus(poId, 'COMPLETED', user.name);
    alert(`Order ${poId} has been successfully processed and moved to inventory.`);
    fetchData();
  };
  
  // --- QR Scanner Handlers ---
  const onScanSuccess = (decodedText, decodedResult) => {
      console.log(`Scan result: ${decodedText}`, decodedResult);
      setIsScanning(false);
      // Logic to find and process the order based on the scanned QR
      const scannedPoId = decodedText.split(';')[0].split(':')[1];
      const orderExists = unprocessedOrders.some(o => o.id === scannedPoId);

      if (orderExists) {
        // Here we add the "Intelligent Storage Suggestion" logic
        const suggestedLocation = `A-R${Math.floor(Math.random() * 6) + 1}-S1`; // Random for demo
        alert(`Product from Order ${scannedPoId} scanned successfully! \n\n**INTELLIGENT SUGGESTION:**\nStore this item at location: ${suggestedLocation}`);
        handleProcessOrder(scannedPoId);
      } else {
        alert(`Error: Scanned order ${scannedPoId} is not in the 'Awaiting Storage' list.`);
      }
  };

  const onScanFailure = (error) => {
    // This will happen frequently, so we can keep it silent or log for debug
    // console.warn(`QR scan error: ${error}`);
  };

  return (
    <div>
      {/* Conditionally render the scanner */}
      {isScanning && (
        <QRScanner
          onScanSuccess={onScanSuccess}
          onScanFailure={onScanFailure}
          onClose={() => setIsScanning(false)}
        />
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Storage & Inventory Management</h2>
        <button 
          onClick={() => setIsScanning(true)}
          className="flex items-center gap-2 px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
        >
          <QrCode size={20} />
          Scan Product to Store
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">Awaiting Storage Assignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {unprocessedOrders.length > 0 ? unprocessedOrders.map((po) => (
          <div key={po.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
            <h3 className="font-bold">{po.id}</h3>
            <p className="text-sm">Arrived on: {po.arrivalDate} (Processed by: {po.processedByGate})</p>
            <ul className="mt-2 text-sm list-disc list-inside">
              {po.items.map(item => <li key={item.productId}>{item.name} (x{item.quantity})</li>)}
            </ul>
            <button
              onClick={() => handleProcessOrder(po.id)}
              className="flex items-center gap-2 mt-4 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <PackageCheck size={16} />
              Manual Process
            </button>
          </div>
        )) : <p className="p-4 bg-white rounded-lg text-gray-500">No orders are awaiting storage.</p>}
      </div>
      
      {/* Integrate the Warehouse Visualizer */}
      <WarehouseVisualizer inventory={inventory} />
    </div>
  );
};

export default StoreDashboard;