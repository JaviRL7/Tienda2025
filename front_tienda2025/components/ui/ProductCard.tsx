// components/ui/ProductCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import type { Producto } from "@/app/types/types";

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const { addItem, getItem } = useCart();
  const inCart = getItem(producto.id.toString());

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* Imagen */}
      <img
        src={producto.img || "/default-image.jpg"}
        alt={producto.categoria?.nombre || producto.codigo_tintada}
        className="w-full h-48 object-cover"
      />

      {/* Separador burdeos */}
      <div className="h-1 bg-[#6B2122]"></div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Título: categoría en grande */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {producto.categoria?.nombre.toUpperCase()}
        </h2>

        {/* Color y código */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">COLOR:</span> {producto.codigo_color}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">CÓDIGO TINTADA:</span> {producto.codigo_tintada}
        </p>

        {/* Precio */}
        <p className="text-lg font-semibold text-gray-800 mt-2">
          €{producto.precio.toFixed(2)}
        </p>

        {/* Botones al fondo */}
        <div className="mt-auto flex items-center justify-between">
          {/* Ver detalle */}
          <Link
            href={`/tienda/${producto.id}`}
            className="text-sm text-[#6B2122] hover:underline"
          >
            Ver detalle
          </Link>

          {/* Añadir al carrito */}
          <button
            onClick={() =>
              addItem({
                id: producto.id.toString(),
                price: producto.precio,
                name: producto.categoria?.nombre || "",
                image: producto.img || "",
                quantity: 1,
              })
            }
            className="bg-[#6B2122] hover:bg-[#4b1516] text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            {inCart ? `Añadir otra (${inCart.quantity})` : "Añadir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
