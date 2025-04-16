"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Para animaciones
import FilterButton from "./ui/buttons/FilterButton";
import ProductCard from "./ui/ProductCard"; // Asegúrate de tener este componente
import { Producto, Tipo, Categoria } from "@/app/types/types";

interface ProductShowcaseProps {
  productos: Producto[];
  tipos: Tipo[];
  categorias: Categoria[];
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ productos, tipos, categorias }) => {
  // Estados para controlar los filtros
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);

  // Filtra sólo los productos que se deben mostrar en pantalla
  const productosEnPantalla = productos.filter((p) => p.en_pantalla);

  // Filtrado de productos según el botón seleccionado
  const filteredProducts = useMemo(() => {
    return productosEnPantalla.filter((producto) => {
        const matchTipo = selectedTipo ? producto.categoria?.tipoId === Number(selectedTipo) : true;
        // Suponemos que el producto tiene un campo "categoriaId". Convertimos selectedCategoria a número.
        const matchCategoria = selectedCategoria ? producto.categoria?.id === Number(selectedCategoria) : true;
        return matchTipo && matchCategoria;
    });
  }, [productosEnPantalla, selectedTipo, selectedCategoria]);

  // Definición de variantes para la animación con Framer Motion
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Nuestros Productos</h2>
      
      {/* Filtro por TIPOS */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tipos.map((tipo) => (
          <FilterButton 
            key={tipo.id} 
            label={tipo.nombre} 
            active={selectedTipo === tipo.nombre}
            onClick={() => {
              if (selectedTipo === tipo.nombre) {
                setSelectedTipo(null);
              } else {
                setSelectedTipo(tipo.nombre);
              }
            }}
          />
        ))}
      </div>
      
      {/* Filtro por CATEGORÍAS */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categorias.map((cat) => (
          <FilterButton 
            key={cat.id} 
            label={cat.nombre} 
            active={selectedCategoria === cat.id.toString()}
            onClick={() => {
              if (selectedCategoria === cat.id.toString()) {
                setSelectedCategoria(null);
              } else {
                setSelectedCategoria(cat.id.toString());
              }
            }}
          />
        ))}
      </div>
      
      {/* Lista de Productos con animación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredProducts.map((producto) => (
            <motion.div 
              key={producto.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <ProductCard producto={producto} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShowcase;
