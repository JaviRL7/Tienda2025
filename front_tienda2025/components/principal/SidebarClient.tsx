// components/principal/SidebarClient.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import type { Tipo, Categoria } from "@/app/types/types";

interface SidebarClientProps {
  tipos: Tipo[];
  categorias: Categoria[];
}

export default function SidebarClient({ tipos, categorias }: SidebarClientProps) {
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);

  const handleFilter = (categoriaId: number | null) => {
    console.log("Filtrar por categoría:", categoriaId);
    setSelectedCategoria(categoriaId);
    // aquí podrías llamar a un context, router.push, etc.
  };

  return (
    <Sidebar
      tipos={tipos}
      categorias={categorias}
      onFilter={handleFilter}
    />
  );
}
