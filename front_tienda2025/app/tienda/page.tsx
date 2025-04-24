// app/tienda/page.tsx — **SIN** "use client"
import React from "react";
import SidebarClient from "@/components/principal/SidebarClient";
import TiendaClient from "@/components/tienda/TiendaClient";
import { getProductos, getTipos, getCategorias } from "@/lib/db";
import type { Producto, Tipo, Categoria } from "@/app/types/types";

export default async function TiendaPage() {
  const productosRaw = await getProductos();
  const tipos = await getTipos();
  const categorias = await getCategorias();

  const productos: Producto[] = productosRaw.map(p => ({
    ...p,
    en_pantalla: p.en_pantalla ?? false,
  }));

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <SidebarClient tipos={tipos} categorias={categorias} />
      </aside>
      <main className="flex-1 p-6">
        <TiendaClient productos={productos} />
      </main>
    </div>
  );
}
