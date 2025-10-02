'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const itemCount = getTotalItems();
  const total = getTotalPrice();

  const handleCheckout = () => {
    toast.error('No es posible comprar productos ahora mismo.');
    console.log('Proceder al checkout');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader className="pb-4 border-b border-gray-200">
          <SheetTitle className="text-xl font-bold text-foreground">
            Carrito de Compras ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Revisa los productos en tu carrito antes de proceder al checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto py-4 overscroll-contain">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="text-gray-700 text-lg mb-2 font-semibold">
                  Tu carrito está vacío
                </div>
                <p className="text-gray-500 text-sm">
                  Añade algunos productos para empezar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      {item.producto.img ? (
                        <Image
                          src={item.producto.img}
                          alt={item.producto.codigoColor}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-2xl font-bold text-gray-400">
                            {item.producto.codigoColor?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {item.producto.codigoColor}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {item.producto.codigoTintada}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {Number(item.producto.precio).toFixed(2)} €
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
            <div className="border-t border-gray-200 pt-4 space-y-4 bg-gray-50 rounded-xl p-4 shadow-sm">
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
                  className="w-full border-gray-300 hover:bg-gray-100 transition-all duration-200"
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