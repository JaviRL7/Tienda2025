"use client";
import React, { useState } from "react";
import type { Tipo, Categoria } from "@/app/types/types";

export interface SidebarProps {
  tipos: Tipo[];
  categorias: Categoria[];
  onFilter: (categoriaId: number | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tipos, categorias, onFilter }) => {
  const [selectedTipo, setSelectedTipo] = useState<number | null>(null);

  const categoriasFiltradas = selectedTipo !== null
    ? categorias.filter((c) => c.tipoId === selectedTipo)
    : [];

  return (
    <div>
      <h2 className="font-bold mb-2">Tipos</h2>
      {tipos.map((t) => (
        <button
          key={t.id}
          onClick={() => setSelectedTipo(t.id)}
          className="block mb-1 px-3 py-1 border rounded"
        >
          {t.nombre}
        </button>
      ))}

      {selectedTipo !== null && (
        <>
          <h2 className="font-bold mt-4 mb-2">Categorías</h2>
          {categoriasFiltradas.map((c) => (
            <button
              key={c.id}
              onClick={() => onFilter(c.id)}
              className="block mb-1 px-3 py-1 border rounded"
            >
              {c.nombre}
            </button>
          ))}
          <button
            onClick={() => onFilter(null)}
            className="mt-2 text-sm text-gray-600"
          >
            Mostrar todo
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
