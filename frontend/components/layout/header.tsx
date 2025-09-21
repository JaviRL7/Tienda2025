"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, Search, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/auth"; // Temporalmente deshabilitado
import CartIndicator from "@/components/cart/cart-indicator";
import AuthModal from "@/components/auth/auth-modal";
// import CartDrawer from "@/components/cart/cart-drawer"; // Ahora se maneja desde CartIndicator
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/constants";

interface HeaderProps {
  className?: string;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export default function Header({ className, onOpenAuth }: HeaderProps) {
  // Temporalmente sin autenticación
  const isAuthenticated = false;
  const user = null;

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
            href="/tienda"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Tienda
          </Link>
          <Link
            href="/galeria"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Galería
          </Link>
          <Link
            href="/perfil"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Mi Perfil
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <CartIndicator />

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
        </div>
      </div>
      {/* CartDrawer ahora se maneja desde CartIndicator */}
    </header>
  );
}