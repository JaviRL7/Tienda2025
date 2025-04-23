// app/tienda/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SidebarClient from "@/components/principal/SidebarClient";
import { getTipos, getCategorias } from "@/lib/db";
import type { Tipo, Categoria } from "@/app/types/types";

export const metadata: Metadata = { title: "Tienda" };

export default async function TiendaLayout({ children }: { children: ReactNode }) {
  const tipos: Tipo[] = await getTipos();
  const categorias: Categoria[] = await getCategorias();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        {/* Pasamos SOLO los datos; el handler lo define SidebarClient */}
        <SidebarClient tipos={tipos} categorias={categorias} />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
