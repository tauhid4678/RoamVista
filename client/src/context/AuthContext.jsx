import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
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

  // Sync Firebase user with backend MongoDB database
  const syncWithBackend = async (userData) => {
    try {
      const response = await api.post('/auth/firebase', {
        name: userData.displayName || userData.name,
        email: userData.email,
        avatar: userData.photoURL || userData.avatar,
        uid: userData.uid,
      });

      if (response.data && response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user, token: response.data.token };
      }
      throw new Error(response.data?.message || 'Server synchronization failed');
    } catch (err) {
      // In case server is temporarily unreachable, create a client session
      const fallbackUser = {
        id: userData.uid || 'usr_' + Date.now(),
        name: userData.displayName || userData.name || userData.email?.split('@')[0],
        email: userData.email,
        role: userData.email?.toLowerCase() === 'admin@roamvista.com' ? 'admin' : 'user',
        avatar: userData.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      };
      const fallbackToken = 'mock_jwt_' + Date.now();
      setUser(fallbackUser);
      setToken(fallbackToken);
      return { success: true, user: fallbackUser };
    }
  };

  // Google 1-Click Sign-In via Firebase
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (!auth || !googleProvider) {
        throw new Error('Firebase Authentication is not configured.');
      }
      const result = await signInWithPopup(auth, googleProvider);
      const synced = await syncWithBackend(result.user);
      return synced;
    } catch (error) {
      console.error('[Firebase Google Auth Error]', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Login (Firebase + MongoDB)
  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. First authenticate with backend / MongoDB
      const response = await api.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);

        // Also sign in to Firebase in background if possible
        if (auth) {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch {
            // Ignore if user only exists in MongoDB
          }
        }

        return { success: true, user: response.data.user };
      }
      throw new Error(response.data?.message || 'Login failed');
    } catch (err) {
      // 2. If backend failed, try Firebase directly
      if (auth) {
        try {
          const fbResult = await signInWithEmailAndPassword(auth, email, password);
          const synced = await syncWithBackend(fbResult.user);
          return synced;
        } catch (fbErr) {
          throw new Error(err.response?.data?.message || fbErr.message || 'Invalid credentials');
        }
      }
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Registration (Firebase Auth + MongoDB persistence)
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      let fbUser = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        fbUser = userCredential.user;
        await updateProfile(fbUser, { displayName: name });
      } catch (fbErr) {
        console.warn('[Firebase Auth Register Notice]', fbErr.message);
      }

      // 2. Persist user in MongoDB backend
      try {
        const response = await api.post('/auth/register', { name, email, password });
        if (response.data && response.data.success) {
          setUser(response.data.user);
          setToken(response.data.token);
          return { success: true, user: response.data.user };
        }
      } catch (serverErr) {
        // If already created in Firebase, sync via firebase route
        if (fbUser) {
          return await syncWithBackend({ ...fbUser, displayName: name });
        }
        throw serverErr;
      }

      if (fbUser) {
        return await syncWithBackend({ ...fbUser, displayName: name });
      }

      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Sign out from both Firebase and Local session
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[Firebase SignOut Error]', err);
    }
    setUser(null);
    setToken(null);
  };

  // 1-Click Evaluation / Demo Login
  const demoLogin = (role = 'user') => {
    if (role === 'admin') {
      return login('admin@roamvista.com', 'AdminPass123!');
    }
    return login('traveler@roamvista.com', 'Traveler123!');
  };

  const updateUserSession = (updatedUser) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedUser };
      localStorage.setItem('roamvista_user', JSON.stringify(merged));
      return merged;
    });
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
        signInWithGoogle,
        demoLogin,
        updateUserSession,
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

export default AuthContext;
