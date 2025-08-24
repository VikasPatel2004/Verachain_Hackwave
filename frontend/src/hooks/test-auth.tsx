'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  test: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const value: AuthContextType = {
    test: 'test'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useTest() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
