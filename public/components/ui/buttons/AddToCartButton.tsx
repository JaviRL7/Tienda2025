// components/ui/buttons/AddToCartButton.tsx
"use client";

import { useCart } from "react-use-cart";
import type { Producto } from "@/app/types/types";

interface AddToCartButtonProps {
  producto: Producto;
}

export default function AddToCartButton({ producto }: AddToCartButtonProps) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() =>
        addItem({
          id: producto.id.toString(),
          price: producto.precio,
          name: producto.categoria?.nombre ?? "Producto",
          image: producto.img ?? "",
        })
      }
      className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
    >
      Añadir al carrito
    </button>
  );
}
