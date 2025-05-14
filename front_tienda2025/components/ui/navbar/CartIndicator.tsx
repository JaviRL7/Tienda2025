// components/ui/navbar/CartIndicator.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "react-use-cart";

interface CartIndicatorProps {
  /** Se dispara al hacer click sobre el icono */
  onClick?: () => void;
}

export default function CartIndicator({ onClick }: CartIndicatorProps) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:text-gray-700 focus:outline-none"
      aria-label="Ver carrito"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span
          className="
            absolute 
            -top-1 
            -right-1 
            inline-flex 
            items-center 
            justify-center 
            px-1.5 
            py-0.5 
            text-xs 
            font-bold 
            leading-none 
            text-white 
            bg-red-600 
            rounded-full
          "
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
