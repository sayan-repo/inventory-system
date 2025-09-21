// src/components/layout/Header.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-end px-8">
      <div className="flex items-center gap-4">
        <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
        </div>
        <button 
          onClick={logout} 
          className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;