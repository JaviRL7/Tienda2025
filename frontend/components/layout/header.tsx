"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, Search, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useAuthModal } from "@/store/auth-modal-context";
import CartIndicator from "@/components/cart/cart-indicator";
import AuthModal from "@/components/auth/auth-modal";
import { useAuthCheck } from "@/hooks/use-auth-check";
// import CartDrawer from "@/components/cart/cart-drawer"; // Ahora se maneja desde CartIndicator
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/constants";
import { useState } from "react";

interface HeaderProps {
  className?: string;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export default function Header({ className, onOpenAuth }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { openLogin } = useAuthModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verificar autenticación una sola vez al cargar
  useAuthCheck();

  const handleTiendaClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openLogin();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center -my-2">
          <img
            src={ASSETS.LOGOS.HORIZONTAL}
            alt="Doña Araña"
            className="h-20 md:h-24 lg:h-28 xl:h-32 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Principal
          </Link>
          <Link
            href="/tienda"
            onClick={handleTiendaClick}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Tienda
          </Link>
          <Link
            href="/galeria"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Galería
          </Link>
          <Link
            href="/info"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Información
          </Link>
          <Link
            href="/perfil"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Mi Perfil
          </Link>
          {isAuthenticated && user?.rol === 'admin' && (
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary text-amber-600 font-semibold"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <CartIndicator />

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                Hola, {user?.nombre}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Salir
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenAuth?.('login')}
              >
                Iniciar Sesión
              </Button>
              <Button
                size="sm"
                onClick={() => onOpenAuth?.('register')}
              >
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Principal
              </Link>
              <Link
                href="/tienda"
                onClick={(e) => {
                  handleTiendaClick(e);
                  closeMobileMenu();
                }}
                className="block text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Tienda
              </Link>
              <Link
                href="/galeria"
                onClick={closeMobileMenu}
                className="block text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Galería
              </Link>
              <Link
                href="/info"
                onClick={closeMobileMenu}
                className="block text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Información
              </Link>
              <Link
                href="/perfil"
                onClick={closeMobileMenu}
                className="block text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Mi Perfil
              </Link>
              {isAuthenticated && user?.rol === 'admin' && (
                <Link
                  href="/admin"
                  onClick={closeMobileMenu}
                  className="block text-sm font-medium transition-colors hover:text-primary text-amber-600 font-semibold py-2"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Divider */}
            <div className="border-t"></div>

            {/* Cart and Actions */}
            <div className="space-y-4">
              <div className="flex items-center justify-start">
                <CartIndicator />
              </div>

              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">
                    Hola, {user?.nombre}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Salir
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onOpenAuth?.('login');
                      closeMobileMenu();
                    }}
                    className="w-full justify-start"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      onOpenAuth?.('register');
                      closeMobileMenu();
                    }}
                    className="w-full"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CartDrawer ahora se maneja desde CartIndicator */}
    </header>
  );
}