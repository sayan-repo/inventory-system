// src/api/mockApi.js
import { users } from '../data/users';
import { inventory } from '../data/inventory';
import { purchaseOrders } from '../data/purchaseOrders';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (username, password) => {
    await delay(500);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, user: { id: user.id, name: user.name, username: user.username, role: user.role } };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  getPurchaseOrders: async () => {
    await delay(300);
    return [...purchaseOrders];
  },
  
  getInventory: async () => {
      await delay(300);
      return [...inventory];
  },

  createPurchaseOrder: async (orderData) => {
    await delay(500);
    const newOrder = {
        id: `PO-2025-${(purchaseOrders.length + 1).toString().padStart(3, '0')}`,
        status: 'PENDING_ARRIVAL',
        ...orderData,
    };
    purchaseOrders.push(newOrder);
    return { success: true, order: newOrder };
  },

  getUsers: async () => {
    await delay(200);
    return users.map(({ password, ...user }) => user);
  },

  updatePOStatus: async (poId, newStatus, userName) => {
      await delay(400);
      const order = purchaseOrders.find(po => po.id === poId);
      if(!order) return { success: false, message: "Order not found"};
      
      order.status = newStatus;
      if (newStatus === 'ARRIVED') {
        order.processedByGate = userName;
        order.arrivalDate = new Date().toISOString().split('T')[0];
      }
      if (newStatus === 'COMPLETED') {
        order.processedByStore = userName;
        // In a real app, this would also add items to the main inventory
      }
      return { success: true, order };
  },
};