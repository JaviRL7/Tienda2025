'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { productosApi, type Producto } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import EnhancedProductGrid from '@/components/product/enhanced-product-grid';

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
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true);
        const response = showOnlyInDisplay
          ? await productosApi.getEnPantalla()
          : await productosApi.getAll();
        setProductos(response.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Error al cargar los productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, [showOnlyInDisplay]);

  if (loading) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="h-8 w-8 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{
            fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
          }}>
            {title}
          </h2>
          {productos.length > 0 && (
            <p className="text-gray-600 text-lg">
              {showOnlyInDisplay
                ? `${productos.length} productos destacados para ti`
                : `Descubre nuestros ${productos.length} productos únicos`
              }
            </p>
          )}
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-8 rounded-2xl bg-gray-100 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {showOnlyInDisplay ? 'No hay productos destacados' : 'No hay productos disponibles'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              {showOnlyInDisplay
                ? 'Aún no se han marcado productos como destacados'
                : 'No se encontraron productos en este momento'
              }
            </p>
          </div>
        ) : (
          <EnhancedProductGrid
            productos={productos}
          />
        )}
      </div>
    </section>
  );
}