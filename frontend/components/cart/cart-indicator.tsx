'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import CartDrawer from './cart-drawer';

export default function CartIndicator() {
  const { items, isOpen, openCart, closeCart } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={openCart}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}