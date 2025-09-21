// src/data/inventory.js
export const inventory = [
    { 
      id: 'RM-001-B1', 
      name: 'Grade A Steel Coil', 
      type: 'RAW_MATERIAL', 
      quantity: 50, 
      unit: 'coils',
      location: 'A1-R2-S3', // Aisle 1, Rack 2, Shelf 3
      supplier: 'Steel Corp',
      dateAdded: '2025-09-20',
      qrCodeValue: 'INV-RM-001-B1-20250920',
      velocity: 'SLOW'
    },
    {
      id: 'FP-001-B1',
      name: 'Model X Car Door',
      type: 'FINISHED_PRODUCT',
      quantity: 200,
      unit: 'units',
      location: 'C3-R1-S1',
      materialsUsed: ['RM-001-B1'],
      dateAdded: '2025-09-21',
      qrCodeValue: 'INV-FP-001-B1-20250921',
      velocity: 'MEDIUM'
    },
    {
      id: 'RM-002-B1',
      name: 'Microchips',
      type: 'RAW_MATERIAL',
      quantity: 10000,
      unit: 'chips',
      location: 'B2-R5-S1',
      supplier: 'Chip Co.',
      dateAdded: '2025-09-19',
      qrCodeValue: 'INV-RM-002-B1-20250919',
      velocity: 'SLOW'
    },
  ];