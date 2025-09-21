import { useState, useEffect } from 'react';
import { productosApi, type Producto } from '@/lib/api';

interface UseProductosProps {
  enPantalla?: boolean;
  categoriaId?: number;
  autoFetch?: boolean;
}

interface UseProductosReturn {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProductos({
  enPantalla = false,
  categoriaId,
  autoFetch = true
}: UseProductosProps = {}): UseProductosReturn {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (enPantalla) {
        response = await productosApi.getEnPantalla();
      } else if (categoriaId) {
        response = await productosApi.getByCategoria(categoriaId);
      } else {
        response = await productosApi.getAll();
      }

      setProductos(response.data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar productos');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProductos();
    }
  }, [enPantalla, categoriaId, autoFetch]);

  return {
    productos,
    loading,
    error,
    refetch: fetchProductos
  };
}