// src/components/WarehouseVisualizer.jsx
import React from 'react';

// This is mock data representing your warehouse layout.
const WAREHOUSE_LAYOUT = {
  aisles: [
    { id: 'A', racks: 6 },
    { id: 'B', racks: 6 },
    { id: 'C', racks: 6 },
  ],
};

const WarehouseVisualizer = ({ inventory }) => {
  // Create a map of occupied locations for quick lookup
  const occupiedLocations = new Set(inventory.map(item => item.location.split('-')[0] + '-' + item.location.split('-')[1])); // e.g., "A1-R2" becomes "A-R2"

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="font-semibold mb-4 text-xl">Warehouse Occupancy Map</h3>
      <div className="flex gap-4 p-4 bg-gray-50 rounded-lg overflow-x-auto">
        {WAREHOUSE_LAYOUT.aisles.map(aisle => (
          <div key={aisle.id} className="flex flex-col items-center">
            <p className="font-bold text-lg mb-2">Aisle {aisle.id}</p>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: aisle.racks }, (_, i) => {
                const rackId = `${aisle.id}-R${i + 1}`;
                const isOccupied = occupiedLocations.has(rackId);
                return (
                  <div
                    key={rackId}
                    className={`w-20 h-12 flex items-center justify-center rounded border-2 transition-all
                      ${isOccupied ? 'bg-red-200 border-red-400' : 'bg-green-200 border-green-400'}`}
                    title={isOccupied ? `Occupied` : `Empty`}
                  >
                    <span className="font-mono text-sm font-semibold">{rackId}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-200 rounded"></div><span>Empty</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-200 rounded"></div><span>Occupied</span></div>
      </div>
    </div>
  );
};

export default WarehouseVisualizer;