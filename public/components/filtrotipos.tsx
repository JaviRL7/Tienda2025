"use client";

import React, { useState } from "react";
import { Tipo, Categoria } from "@/app/types/types";
import { CategoriasPorTipo } from "@/lib/utils";

interface FiltroTiposProps {
  tipos: Tipo[];
  categorias: Categoria[];
}

const FiltroTipos: React.FC<FiltroTiposProps> = ({ tipos, categorias }) => {
  const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);

  const handleSelectTipo = (tipoId: number) => {
    setSelectedTipoId(selectedTipoId === tipoId ? null : tipoId);
  };

  const categoriasFiltradas =
    selectedTipoId !== null ? CategoriasPorTipo(categorias, selectedTipoId) : [];

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        {tipos.map((tipo) => (
          <button
            key={tipo.id}
            onClick={() => handleSelectTipo(tipo.id)}
            className={`px-4 py-2 rounded border transition-colors duration-300 ${
              selectedTipoId === tipo.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tipo.nombre}
          </button>
        ))}
      </div>
      {selectedTipoId !== null && (
        <div className="flex gap-4">
          {categoriasFiltradas.length > 0 ? (
            categoriasFiltradas.map((categoria) => (
              <button
                key={categoria.id}
                className="px-4 py-2 rounded border bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
              >
                {categoria.nombre}
              </button>
            ))
          ) : (
            <span className="text-gray-600">No hay categorías para este tipo.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltroTipos;
