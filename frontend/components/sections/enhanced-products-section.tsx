'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { productosApi, type Producto } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import EnhancedProductGrid from '@/components/product/enhanced-product-grid';
import { motion } from 'framer-motion';

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
    <motion.section
      className={`py-16 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {title}
          </motion.h2>
          {productos.length > 0 && (
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {showOnlyInDisplay
                ? `${productos.length} productos destacados para ti`
                : `Descubre nuestros ${productos.length} productos únicos`
              }
            </motion.p>
          )}
        </motion.div>

        {productos.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="p-8 rounded-2xl bg-gray-100 w-32 h-32 mx-auto mb-8 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-4xl text-gray-400">📦</span>
            </motion.div>
            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {showOnlyInDisplay ? 'No hay productos destacados' : 'No hay productos disponibles'}
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {showOnlyInDisplay
                ? 'Aún no se han marcado productos como destacados'
                : 'No se encontraron productos en este momento'
              }
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <EnhancedProductGrid
              productos={productos}
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}