'use client';

import { useState } from 'react';
import Header from './header';
import EnhancedFooter from './enhanced-footer';
import AuthModal from '@/components/auth/auth-modal';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { CartProvider } from '@/store/cart-context';
import { AuthModalProvider } from '@/store/auth-modal-context';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = 'min-h-screen bg-background'
}: MainLayoutProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const openLogin = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <CartProvider>
      <AuthModalProvider openLogin={openLogin} openRegister={openRegister}>
        <div className={className}>
          {showHeader && <Header onOpenAuth={openAuthModal} />}
          <main className="flex-1">
            {children}
          </main>
          {showFooter && <EnhancedFooter />}
          <Toaster richColors position="top-right" />

          {/* Auth Modal - handles both login and register */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={closeAuthModal}
            initialMode={authModalMode}
          />
        </div>
      </AuthModalProvider>
    </CartProvider>
  );
}