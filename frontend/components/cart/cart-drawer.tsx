'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/store/cart-context';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    total,
    itemCount,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    console.log('Proceder al checkout');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-amber-50 to-orange-100">
        <SheetHeader className="pb-4 border-b border-amber-200">
          <SheetTitle className="text-xl font-bold text-foreground">
            Carrito de Compras ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center bg-white/60 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                <div className="text-amber-600 text-lg mb-2 font-semibold">
                  Tu carrito está vacío
                </div>
                <p className="text-amber-600/70 text-sm">
                  Añade algunos productos para empezar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={item.color.imagenPrincipal || '/productos/placeholder.jpg'}
                        alt={item.producto.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {item.producto.nombre}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {item.color.color.nombre}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {item.color.precioBase.toFixed(2)} €
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.cantidad}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-amber-200 pt-4 space-y-4 bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total:</span>
                <span className="text-xl font-bold text-primary">
                  {total.toFixed(2)} €
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  Proceder al Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full border-amber-300 hover:bg-amber-50 transition-all duration-200"
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}