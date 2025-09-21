// src/data/purchaseOrders.js
export const purchaseOrders = [
    {
      id: 'PO-2025-001',
      createdBy: 'Perry Purchase',
      creationDate: '2025-09-20',
      status: 'COMPLETED', // PENDING_ARRIVAL, ARRIVED, PROCESSED, COMPLETED
      items: [
        { productId: 'RM-001-B1', name: 'Grade A Steel Coil', quantity: 50 },
      ],
      arrivalDate: '2025-09-21',
      processedByGate: 'Gary Gate',
      processedByStore: 'Stacy Store',
    },
    {
      id: 'PO-2025-002',
      createdBy: 'Perry Purchase',
      creationDate: '2025-09-21',
      status: 'ARRIVED',
      items: [
        { productId: 'RM-003-B1', name: 'Industrial Grade Screws', quantity: 50000 },
        { productId: 'RM-004-B1', name: 'Rubber Gaskets', quantity: 10000 },
      ],
      arrivalDate: null,
      processedByGate: 'Gary Gate',
      processedByStore: null,
    },
      {
      id: 'PO-2025-003',
      createdBy: 'Perry Purchase',
      creationDate: '2025-09-22',
      status: 'PENDING_ARRIVAL',
      items: [
        { productId: 'RM-002-B2', name: 'Microchips', quantity: 5000 },
      ],
      arrivalDate: null,
      processedByGate: null,
      processedByStore: null,
    }
  ];