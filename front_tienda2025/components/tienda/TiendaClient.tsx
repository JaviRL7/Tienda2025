// components/tienda/TiendaClient.tsx
"use client";

import React, { useState } from "react";
import { useCart } from "react-use-cart";
import type { Producto, Tipo, Categoria } from "@/app/types/types";
import Sidebar from "@/components/principal/Sidebar";
import ProductCard from "@/components/ui/ProductCard";
import { SessionProvider } from "next-auth/react";

interface TiendaClientProps {
  productos: Producto[];
  tipos: Tipo[];
  categorias: Categoria[];
}

export default function TiendaClient({
  productos,
  tipos,
  categorias,
}: TiendaClientProps) {
  const [filterCat, setFilterCat] = useState<number | null>(null);
  const { addItem } = useCart();

  // Aplica filtro por categoría si hay uno seleccionado
  const mostrados = filterCat
    ? productos.filter((p) => p.categoria?.id === filterCat)
    : productos;

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        {/* Sidebar recibe la función onFilter */}
        <aside className="w-64 border-r p-4">
          <Sidebar
            tipos={tipos}
            categorias={categorias}
            onFilter={setFilterCat}
          />
        </aside>

        {/* Listado de productos */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {mostrados.map((p) => (
            <div key={p.id} className="border p-4 rounded flex flex-col">
              <ProductCard producto={p} />

              <button
                onClick={() =>
                  addItem({
                    id: p.id.toString(),
                    price: p.precio,
                    name: p.categoria?.nombre ?? "Producto",
                    image: p.img ?? "",
                  })
                }
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Añadir al carrito
              </button>

              <a
                href={`/tienda/${p.id}`}
                className="mt-2 text-center text-sm text-gray-600 hover:underline"
              >
                Ver detalle
              </a>
            </div>
          ))}
        </main>
      </div>
    </SessionProvider>
  );
}
