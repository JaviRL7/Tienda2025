"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Producto, Tipo, Categoria } from "@/app/types/types";
import ProductCard from "@/components/ui/ProductCard";
import { productosEnPantalla } from "@/lib/utils";
import FiltroTiposCategorias from "./FiltroTiposCategorias";

interface ProductListProps {
  productos: Producto[];
  tipos: Tipo[];
  categorias: Categoria[];
}

const ProductList: React.FC<ProductListProps> = ({ productos, tipos, categorias }) => {
  // Filtramos inicialmente solo productos visibles
  const productosVisibles = productosEnPantalla(productos);

  // Estado para el filtro de tipo y categoría
  const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(null);

  // Filtrado de productos basado en categoría; si hay filtro de categoría, lo aplicamos
  // Si no, se pueden mostrar todos los productos visibles o filtrar por tipo
  const filteredProducts = useMemo(() => {
    if (selectedCategoriaId !== null) {
      return productosVisibles.filter(
        (producto) =>
          producto.categoria !== null && producto.categoria.id === selectedCategoriaId
      );
    } else if (selectedTipoId !== null) {
      return productosVisibles.filter(
        (producto) =>
          producto.categoria !== null && producto.categoria.tipoId === selectedTipoId
      );
    } else {
      return productosVisibles;
    }
  }, [productosVisibles, selectedTipoId, selectedCategoriaId]);

  return (
    <div>
      {/* Filtro: Se pasa la información y callbacks para actualizar los filtros */}
      <FiltroTiposCategorias
        tipos={tipos}
        categorias={categorias}
        selectedTipoId={selectedTipoId}
        selectedCategoriaId={selectedCategoriaId}
        onTipoSelect={setSelectedTipoId}
        onCategoriaSelect={setSelectedCategoriaId}
      />

      {/* Cuadrícula de productos filtrados con animación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((producto) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard producto={producto} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center">
              No hay productos disponibles para el filtro seleccionado.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductList;
