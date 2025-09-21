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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full">
      {/* Imagen completa */}
      <div className="w-full aspect-w-4 aspect-h-3">
        <img
          src={producto.img || "/default-image.jpg"}
          alt={producto.categoria?.nombre || producto.codigo_tintada}
          className="w-full h-full object-contain bg-gray-50"
        />
      </div>

      {/* Separador burdeos */}
      <div className="h-1 bg-[#6B2122]"></div>

      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Nombre de la categoría en grande */}
        <h2 className="text-2xl font-extrabold text-gray-900">
          {producto.categoria?.nombre.toUpperCase()}
        </h2>

        {/* Color y código tintada, con más espaciado */}
        <div className="space-y-1">
          <p className="text-base text-gray-700">
            <span className="font-semibold">COLOR:</span> {producto.codigo_color}
          </p>
          <p className="text-base text-gray-700">
            <span className="font-semibold">COD TINTADA:</span> {producto.codigo_tintada}
          </p>
        </div>

        {/* Precio */}
        <p className="text-xl font-bold text-gray-800">
          €{producto.precio.toFixed(2)}
        </p>

        {/* Acciones */}
        <div className="mt-auto flex items-center justify-between">
          {/* Botón Ver detalle, destacado */}
          <Link
            href={`/tienda/${producto.id}`}
            className="text-lg font-semibold text-[#6B2122] hover:text-[#4b1516] transition-colors"
          >
            Ver Detalle →
          </Link>

          {/* Botón Añadir al carrito */}
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
            className="bg-[#6B2122] hover:bg-[#4b1516] text-white px-5 py-2 rounded-full text-base font-medium transition-colors"
          >
            {inCart ? `Añadir otra (${inCart.quantity ?? 1})` : "Añadir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
