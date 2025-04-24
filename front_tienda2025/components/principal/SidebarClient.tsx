// components/principal/SidebarClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import type { Tipo, Categoria } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  tipos: Tipo[];
  categorias: Categoria[];
}

export default function SidebarClient({ tipos, categorias }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const catParam = params.get("categoria");
  const [selTipo, setSelTipo] = useState<number | null>(null);
  const [selCategoria, setSelCategoria] = useState<number | null>(
    catParam ? Number(catParam) : null
  );

  // Cuando seleccionas un TIPO:
  const onTipoSelect = (tipoId: number | null) => {
    setSelTipo(prev => prev === tipoId ? null : tipoId);
    // al cambiar tipo, limpiamos categoría
    setSelCategoria(null);
    // actualizamos URL para reflectar el tipo (opcional)
    router.replace(tipoId ? `/tienda?tipo=${tipoId}` : `/tienda`, { scroll: false });
  };

  // Cuando seleccionas una CATEGORÍA:
  const onCategoriaSelect = (categoriaId: number | null) => {
    setSelCategoria(categoriaId);
    if (categoriaId === null) {
      router.replace("/tienda", { scroll: false });
    } else {
      router.replace(`/tienda?categoria=${categoriaId}`, { scroll: false });
    }
  };

  // Si navegas con atrás/adelante, sincronizamos el estado de categoría
  useEffect(() => {
    const c = params.get("categoria");
    setSelCategoria(c ? Number(c) : null);
  }, [params]);

  return (
    <Sidebar
      tipos={tipos}
      categorias={categorias}
      selTipo={selTipo}
      selCategoria={selCategoria}
      onTipoSelect={onTipoSelect}
      onCategoriaSelect={onCategoriaSelect}
    />
  );
}
