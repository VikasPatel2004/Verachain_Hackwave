'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authStorage, api, ApiError } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, role: 'consumer' | 'supplier') => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = authStorage.getToken();
    const storedUser = authStorage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      
      api.getCurrentUser(storedToken)
        .then(({ user }) => {
          setUser(user);
          authStorage.setUser(user);
        })
        .catch(() => {
          authStorage.clear();
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.login({ username, password });
      setToken(response.token);
      setUser(response.user);
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      
      // Redirect to homepage after successful login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string, role: 'consumer' | 'supplier') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.register({ email, username, password, confirmPassword: password, role });
      setToken(response.token);
      setUser(response.user);
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      
      // Redirect to homepage after successful registration
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Registration failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    authStorage.clear();
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
