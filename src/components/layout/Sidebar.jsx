// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, ShoppingCart, Truck, Warehouse, ArrowRightLeft, UserCog, Building2 } from 'lucide-react';

const navLinks = {
  ADMIN: [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', path: '/users', icon: <UserCog size={20} /> },
  ],
  PURCHASE_MANAGER: [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Purchase Orders', path: '/purchase', icon: <ShoppingCart size={20} /> },
  ],
  GATE_MANAGER: [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Arrivals', path: '/gate', icon: <Truck size={20} /> },
  ],
  STORE_MANAGER: [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/store', icon: <Warehouse size={20} /> },
  ],
  OUTGOING_MANAGER: [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Dispatch', path: '/outgoing', icon: <ArrowRightLeft size={20} /> },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const links = user ? navLinks[user.role] : [];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 bg-gray-900">
        <Building2 size={24} className="text-indigo-400 mr-2" />
        <h1 className="text-xl font-bold">Inv-Sys</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                // Use a function for className to apply active styles
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;