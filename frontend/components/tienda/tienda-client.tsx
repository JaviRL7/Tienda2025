'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productosApi, type Producto, type Categoria } from '@/lib/api';
import ProductGrid from '@/components/product/product-grid';
import ProductFilters from '@/components/product/product-filters';
import SearchBar from '@/components/ui/search-bar';
import MainLayout from '@/components/layout/main-layout';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { useAuthStore } from '@/store/auth';

export default function TiendaClient() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadProductos();
  }, [isAuthenticated, router]);

  const loadProductos = async () => {
    try {
      const response = await productosApi.getAll();
      setProductos(response.data);
      setFilteredProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoriaChange = (categoriaId: number | null) => {
    setSelectedCategoria(categoriaId);
    filterProductos(searchTerm, categoriaId);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProductos(term, selectedCategoria);
  };

  const filterProductos = (term: string, categoriaId: number | null) => {
    let filtered = productos;

    if (categoriaId) {
      filtered = filtered.filter(p => p.categoria?.id === categoriaId);
    }

    if (term) {
      filtered = filtered.filter(p =>
        p.codigoColor.toLowerCase().includes(term.toLowerCase()) ||
        p.codigoTintada.toLowerCase().includes(term.toLowerCase()) ||
        p.categoria?.nombre.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProductos(filtered);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Tienda</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <ProductFilters
              onCategoriaChange={handleCategoriaChange}
              selectedCategoria={selectedCategoria}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Mostrando {filteredProductos.length} de {productos.length} productos
              </p>
            </div>
            <ProductGrid productos={filteredProductos} />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}