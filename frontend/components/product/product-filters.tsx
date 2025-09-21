'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { productosApi, type Categoria } from '@/lib/api';

interface ProductFiltersProps {
  onCategoriaChange: (categoriaId: number | null) => void;
  selectedCategoria: number | null;
}

export default function ProductFilters({ onCategoriaChange, selectedCategoria }: ProductFiltersProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await productosApi.getAll();
      const productos = response.data;

      const uniqueCategorias = productos
        .filter(p => p.categoria)
        .reduce((acc, p) => {
          if (!acc.find(c => c.id === p.categoria!.id)) {
            acc.push(p.categoria!);
          }
          return acc;
        }, [] as Categoria[]);

      setCategorias(uniqueCategorias);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    onCategoriaChange(null);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Categorías</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="todas"
                checked={selectedCategoria === null}
                onCheckedChange={() => onCategoriaChange(null)}
              />
              <label htmlFor="todas" className="text-sm cursor-pointer">
                Todas las categorías
              </label>
            </div>
            {categorias.map((categoria) => (
              <div key={categoria.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`categoria-${categoria.id}`}
                  checked={selectedCategoria === categoria.id}
                  onCheckedChange={() =>
                    onCategoriaChange(selectedCategoria === categoria.id ? null : categoria.id)
                  }
                />
                <label
                  htmlFor={`categoria-${categoria.id}`}
                  className="text-sm cursor-pointer"
                >
                  {categoria.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedCategoria && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
          >
            Limpiar filtros
          </Button>
        )}
      </CardContent>
    </Card>
  );
}