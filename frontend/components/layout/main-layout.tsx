'use client';

import { useState } from 'react';
import Header from './header';
import EnhancedFooter from './enhanced-footer';
import AuthModal from '@/components/auth/auth-modal';
import RegisterModal from '@/components/auth/register-modal';
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openAuthModal = (mode: 'login' | 'register') => {
    if (mode === 'login') {
      setIsLoginModalOpen(true);
      setIsRegisterModalOpen(false);
    } else {
      setIsRegisterModalOpen(true);
      setIsLoginModalOpen(false);
    }
  };

  const openLogin = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegister = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
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

        {/* Login Modal - with glass effect */}
        <AuthModal
          isOpen={isLoginModalOpen}
          onClose={closeAllModals}
          initialMode="login"
          onSwitchToRegister={switchToRegister}
        />

        {/* Register Modal - without glass effect */}
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeAllModals}
          onSwitchToLogin={switchToLogin}
        />
        </div>
      </AuthModalProvider>
    </CartProvider>
  );
}