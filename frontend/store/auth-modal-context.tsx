'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthModalContextType {
  openLogin: () => void;
  openRegister: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}

interface AuthModalProviderProps {
  children: ReactNode;
  openLogin: () => void;
  openRegister: () => void;
}

export function AuthModalProvider({ children, openLogin, openRegister }: AuthModalProviderProps) {
  return (
    <AuthModalContext.Provider value={{ openLogin, openRegister }}>
      {children}
    </AuthModalContext.Provider>
  );
}