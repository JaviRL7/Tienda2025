'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import CategoryFilter from '@/components/product/category-filter';
import EnhancedProductGrid from '@/components/product/enhanced-product-grid';
import { useCart } from '@/store/cart-context';
import {
  productos,
  getProductosPorCategoria,
  getProductosPorTipo,
  type Producto,
  type ProductoColor
} from '@/lib/mock-data';

interface EnhancedProductsSectionProps {
  title?: string;
  showOnlyFeatured?: boolean;
  showOnlyInDisplay?: boolean;
  className?: string;
}

export default function EnhancedProductsSection({
  title = "Nuestros Productos",
  showOnlyFeatured = false,
  showOnlyInDisplay = false,
  className = ""
}: EnhancedProductsSectionProps) {
  const [selectedTipoId, setSelectedTipoId] = useState<number | undefined>();
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | undefined>();
  const { addItem } = useCart();

  // Filtrar productos según las opciones
  const filteredProductos = useMemo(() => {
    let filtered = [...productos];

    // Filtros base
    if (showOnlyFeatured) {
      filtered = filtered.filter(p => p.destacado);
    }

    if (showOnlyInDisplay) {
      filtered = filtered.filter(p => p.enPantalla);
    }

    // Filtros de usuario
    if (selectedTipoId) {
      filtered = getProductosPorTipo(selectedTipoId).filter(p =>
        (!showOnlyFeatured || p.destacado) &&
        (!showOnlyInDisplay || p.enPantalla)
      );
    }

    if (selectedCategoriaId) {
      filtered = getProductosPorCategoria(selectedCategoriaId).filter(p =>
        (!showOnlyFeatured || p.destacado) &&
        (!showOnlyInDisplay || p.enPantalla) &&
        (!selectedTipoId || p.categoria.tipoId === selectedTipoId)
      );
    }

    return filtered;
  }, [selectedTipoId, selectedCategoriaId, showOnlyFeatured, showOnlyInDisplay]);

  const handleAddToCart = (producto: Producto, color: ProductoColor) => {
    addItem(producto, color);
    toast.success(`${producto.nombre} (${color.color.nombre}) añadido al carrito`, {
      description: `Precio: €${color.precioBase.toFixed(2)} • SKU: ${color.sku}`,
      duration: 3000,
    });
  };

  const handleAddToWishlist = (producto: Producto) => {
    // Aquí se integraría con el store de favoritos
    toast.success(`${producto.nombre} añadido a favoritos`, {
      duration: 3000,
    });

    console.log('Añadir a favoritos:', producto.nombre);
  };

  const handleTipoChange = (tipoId?: number) => {
    setSelectedTipoId(tipoId);
    // Limpiar categoría si no pertenece al tipo seleccionado
    if (tipoId && selectedCategoriaId) {
      const categoria = productos.find(p => p.categoriaId === selectedCategoriaId)?.categoria;
      if (categoria?.tipoId !== tipoId) {
        setSelectedCategoriaId(undefined);
      }
    }
  };

  const handleCategoriaChange = (categoriaId?: number) => {
    setSelectedCategoriaId(categoriaId);
  };

  return (
    <section className={`section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            <span
              className="block text-3xl md:text-4xl lg:text-5xl mb-3"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                lineHeight: "1.3"
              }}
            >
              Nuestros Productos
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para dar vida a tus ideas.
          </p>
        </div>

        {/* Filtros en la parte superior */}
        <div className="mb-8">
          <CategoryFilter
            selectedTipoId={selectedTipoId}
            selectedCategoriaId={selectedCategoriaId}
            onTipoChange={handleTipoChange}
            onCategoriaChange={handleCategoriaChange}
            productCount={filteredProductos.length}
          />
        </div>

        {/* Grid de productos expandido */}
        <div className="w-full">
          <EnhancedProductGrid
            productos={filteredProductos}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>

        {/* Stats de la sección */}
        <div className="mt-16 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{productos.length}</div>
              <div className="text-sm text-muted-foreground">Productos totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {productos.filter(p => p.destacado).length}
              </div>
              <div className="text-sm text-muted-foreground">Productos destacados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {productos.filter(p => p.enPantalla).length}
              </div>
              <div className="text-sm text-muted-foreground">En pantalla principal</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {productos.reduce((total, p) => total + p.colores.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Variantes de color</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}