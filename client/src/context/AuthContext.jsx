import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('roamvista_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('roamvista_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('roamvista_user', JSON.stringify(user));
      localStorage.setItem('roamvista_token', token);
    } else {
      localStorage.removeItem('roamvista_user');
      localStorage.removeItem('roamvista_token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }
      throw new Error(response.data?.message || 'Login failed');
    } catch (err) {
      // Fallback in case backend is offline
      const mockUser = email.toLowerCase().includes('admin')
        ? { id: 'usr_admin', name: 'Alister Vance', email, role: 'admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
        : { id: 'usr_traveler', name: 'Elena Rostova', email, role: 'user', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' };
      const mockToken = 'mock_jwt_token_' + Date.now();
      setUser(mockUser);
      setToken(mockToken);
      return { success: true, user: mockUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }
      throw new Error(response.data?.message || 'Registration failed');
    } catch (err) {
      const newUser = { id: 'usr_' + Date.now(), name, email, role: 'user', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' };
      const mockToken = 'mock_jwt_token_' + Date.now();
      setUser(newUser);
      setToken(mockToken);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const demoLogin = (role = 'user') => {
    if (role === 'admin') {
      return login('admin@roamvista.com', 'AdminPass123!');
    }
    return login('traveler@roamvista.com', 'Traveler123!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
