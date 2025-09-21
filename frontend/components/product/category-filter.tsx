'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, Filter, ChevronDown, ChevronUp, Layers, Tag } from 'lucide-react';
import { tipos, categorias, type Tipo, type Categoria } from '@/lib/mock-data';

interface CategoryFilterProps {
  selectedTipoId?: number;
  selectedCategoriaId?: number;
  onTipoChange: (tipoId?: number) => void;
  onCategoriaChange: (categoriaId?: number) => void;
  productCount: number;
  className?: string;
}

export default function CategoryFilter({
  selectedTipoId,
  selectedCategoriaId,
  onTipoChange,
  onCategoriaChange,
  productCount,
  className = ""
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredCategorias = selectedTipoId
    ? categorias.filter(c => c.tipoId === selectedTipoId)
    : categorias;

  const clearFilters = () => {
    onTipoChange(undefined);
    onCategoriaChange(undefined);
  };

  const hasActiveFilters = selectedTipoId || selectedCategoriaId;

  return (
    <Card className={`border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground font-bold">
              Filtros de Productos
            </span>
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 font-semibold px-3 py-1"
            >
              {productCount} productos
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-9 w-9 p-0 hover:bg-primary/10 rounded-full transition-all duration-200"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-primary" />
              ) : (
                <ChevronDown className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filtros activos:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedTipoId && (
                <Badge variant="default" className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 pr-1">
                  <Layers className="h-3 w-3 mr-1" />
                  {tipos.find(t => t.id === selectedTipoId)?.nombre}
                  <button
                    onClick={() => onTipoChange(undefined)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategoriaId && (
                <Badge variant="default" className="bg-gradient-to-r from-secondary to-secondary/80 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 pr-1">
                  <Tag className="h-3 w-3 mr-1" />
                  {categorias.find(c => c.id === selectedCategoriaId)?.nombre}
                  <button
                    onClick={() => onCategoriaChange(undefined)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs hover:bg-destructive/10 hover:text-destructive transition-all duration-200 rounded-full px-3"
              >
                <X className="h-3 w-3 mr-1" />
                Limpiar todo
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-6 pt-0 space-y-6">
          <div className="space-y-6">
            {/* Filtro por Tipo */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-base text-foreground">Tipo de producto</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onTipoChange(undefined)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
                    ${!selectedTipoId
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }
                  `}
                >
                  Todos
                </button>
                {tipos.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => onTipoChange(tipo.id)}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
                      ${selectedTipoId === tipo.id
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }
                    `}
                  >
                    {tipo.nombre}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Filtro por Categoría */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-secondary" />
                <h4 className="font-semibold text-base text-foreground">Categoría</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoriaChange(undefined)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
                    ${!selectedCategoriaId
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }
                  `}
                >
                  Todas
                </button>
                {filteredCategorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => onCategoriaChange(categoria.id)}
                    disabled={selectedTipoId && categoria.tipoId !== selectedTipoId}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
                      ${selectedCategoriaId === categoria.id
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }
                      ${selectedTipoId && categoria.tipoId !== selectedTipoId
                        ? 'opacity-40 cursor-not-allowed'
                        : ''
                      }
                    `}
                  >
                    {categoria.nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}