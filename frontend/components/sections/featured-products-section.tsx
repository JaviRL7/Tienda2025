'use client';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/product-card';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { type Producto } from '@/lib/api';

interface FeaturedProductsSectionProps {
  productos: Producto[];
  loading: boolean;
}

export default function FeaturedProductsSection({ productos, loading }: FeaturedProductsSectionProps) {
  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección especial de productos más populares
            </p>
          </div>

          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Productos Destacados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección especial de productos más populares
          </p>
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay productos destacados</h3>
            <p className="text-muted-foreground mb-6">
              Pronto tendremos productos disponibles
            </p>
            <Button asChild>
              <Link href="/tienda">Ver todos los productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {productos.slice(0, 8).map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  variant="featured"
                />
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/tienda">
                  Ver todos los productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}