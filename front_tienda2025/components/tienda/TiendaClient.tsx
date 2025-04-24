// components/tienda/TiendaClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import type { Producto } from "@/app/types/types";
import ProductCard from "@/components/ui/ProductCard";

interface TiendaClientProps {
  productos: Producto[];
}

export default function TiendaClient({ productos }: TiendaClientProps) {
  const params = useSearchParams();
  const catParam = params.get("categoria");
  const filterCat = catParam ? Number(catParam) : null;

  const mostrados = filterCat
    ? productos.filter(p => p.categoria?.id === filterCat)
    : productos;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {mostrados.length > 0 ? (
        mostrados.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))
      ) : (
        <p className="col-span-full text-center">No hay productos para esta categoría.</p>
      )}
    </div>
  );
}
