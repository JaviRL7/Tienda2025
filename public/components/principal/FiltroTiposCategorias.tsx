"use client";

import React from "react";
import { Tipo, Categoria } from "@/app/types/types";
import { CategoriasPorTipo } from "@/lib/utils";

interface FiltroTiposCategoriasProps {
  tipos: Tipo[];
  categorias: Categoria[];
  selectedTipoId: number | null;
  selectedCategoriaId: number | null;
  onTipoSelect: (id: number | null) => void;
  onCategoriaSelect: (id: number | null) => void;
}

const FiltroTiposCategorias: React.FC<FiltroTiposCategoriasProps> = ({
  tipos,
  categorias,
  selectedTipoId,
  selectedCategoriaId,
  onTipoSelect,
  onCategoriaSelect,
}) => {
  const handleClickTipo = (id: number) => {
    // Si se clickea el mismo tipo, deseleccionarlo; de lo contrario, selecciona
    onTipoSelect(selectedTipoId === id ? null : id);
    // Reiniciamos categoría al cambiar de tipo
    onCategoriaSelect(null);
  };

  // Filtramos las categorías según el tipo seleccionado
  const categoriasFiltradas = selectedTipoId !== null 
    ? CategoriasPorTipo(categorias, selectedTipoId)
    : [];

  return (
    <div className="p-4">
      {/* Botones para mostrar los tipos */}
      <div className="flex gap-4 mb-4">
        {tipos.map((tipo) => (
          <button
            key={tipo.id}
            onClick={() => handleClickTipo(tipo.id)}
            className={`px-4 py-2 rounded border transition duration-300 ${
              selectedTipoId === tipo.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tipo.nombre}
          </button>
        ))}
      </div>

      {/* Si hay un tipo seleccionado, mostramos sus categorías */}
      {selectedTipoId !== null && (
        <div className="flex gap-4">
          {categoriasFiltradas.length > 0 ? (
            categoriasFiltradas.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() =>
                  onCategoriaSelect(selectedCategoriaId === categoria.id ? null : categoria.id)
                }
                className={`px-4 py-2 rounded border transition duration-300 ${
                  selectedCategoriaId === categoria.id
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {categoria.nombre}
              </button>
            ))
          ) : (
            <p className="text-gray-600">No hay categorías para este tipo.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltroTiposCategorias;
