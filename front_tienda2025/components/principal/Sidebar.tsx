// components/principal/Sidebar.tsx
"use client";
import React from "react";
import type { Tipo, Categoria } from "@/app/types/types";

interface Props {
  tipos: Tipo[];
  categorias: Categoria[];
  selTipo: number | null;
  selCategoria: number | null;
  onTipoSelect: (tipoId: number | null) => void;
  onCategoriaSelect: (categoriaId: number | null) => void;
}

export default function Sidebar({
  tipos,
  categorias,
  selTipo,
  selCategoria,
  onTipoSelect,
  onCategoriaSelect,
}: Props) {
  // Sólo muestro las categorías del tipo seleccionado
  const catsFiltradas = selTipo !== null
    ? categorias.filter(c => c.tipoId === selTipo)
    : [];

  return (
    <div>
      <h2 className="font-bold mb-2">Tipos</h2>
      {tipos.map(t => (
        <button
          key={t.id}
          onClick={() => onTipoSelect(t.id)}
          className={`block mb-1 px-3 py-1 border rounded transition ${
            selTipo === t.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {t.nombre}
        </button>
      ))}

      {selTipo !== null && (
        <>
          <h2 className="font-bold mt-4 mb-2">Categorías</h2>
          {catsFiltradas.map(c => (
            <button
              key={c.id}
              onClick={() => onCategoriaSelect(c.id)}
              className={`block mb-1 px-3 py-1 border rounded transition ${
                selCategoria === c.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {c.nombre}
            </button>
          ))}

          <button
            onClick={() => onCategoriaSelect(null)}
            className="mt-2 text-sm text-gray-600 hover:underline"
          >
            Mostrar todo
          </button>
        </>
      )}
    </div>
  );
}
