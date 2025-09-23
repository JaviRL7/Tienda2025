'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Grid, List, ArrowUpDown } from 'lucide-react';
import ElegantProductCard from './elegant-product-card';
import type { Producto } from '@/lib/api';

interface EnhancedProductGridProps {
  productos: Producto[];
  className?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'featured' | 'newest';
type ViewMode = 'grid' | 'list';

export default function EnhancedProductGrid({
  productos,
  className = ""
}: EnhancedProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const sortedProductos = [...productos].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return (a.codigoColor || '').localeCompare(b.codigoColor || '');
      case 'name-desc':
        return (b.codigoColor || '').localeCompare(a.codigoColor || '');
      case 'price-asc':
        return Number(a.precio) - Number(b.precio);
      case 'price-desc':
        return Number(b.precio) - Number(a.precio);
      case 'featured':
        if (a.enPantalla && !b.enPantalla) return -1;
        if (!a.enPantalla && b.enPantalla) return 1;
        return (a.codigoColor || '').localeCompare(b.codigoColor || '');
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'featured', label: 'Destacados primero' },
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'newest', label: 'Más recientes' }
  ];

  if (productos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🧶</div>
        <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">
          Prueba a cambiar los filtros o explorar otras categorías
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {productos.length} productos
            </span>
            {sortedProductos.some(p => p.enPantalla) && (
              <Badge variant="secondary" className="text-xs">
                {sortedProductos.filter(p => p.enPantalla).length} destacados
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Selector de ordenación */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selector de vista */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none border-l"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
            : 'space-y-4'
        }
        style={viewMode === 'grid' ? { gridAutoRows: 'max-content' } : {}}
      >
        {sortedProductos.map((producto) => (
          <ElegantProductCard
            key={producto.id}
            producto={producto}
            className={viewMode === 'list' ? 'flex flex-row max-h-64' : ''}
          />
        ))}
      </div>

      {/* Info adicional */}
      <div className="text-center pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          Mostrando {sortedProductos.length} de {productos.length} productos
        </p>
        {sortedProductos.length !== productos.length && (
          <p className="text-xs text-muted-foreground mt-1">
            Algunos productos pueden estar filtrados
          </p>
        )}
      </div>
    </div>
  );
}