// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api/mockApi';

// Notice the "export" keyword here
export const AuthContext = createContext(null);

// And the "export" keyword here
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await api.login(username, password);
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};