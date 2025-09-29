'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, Package, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/main-layout';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { productosApi, apartadosApi, type Producto } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { useFavorites } from '@/store/favorites';
import ElegantProductCard from '@/components/product/elegant-product-card';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [apartandoProducto, setApartandoProducto] = useState(false);
  const [isApartado, setIsApartado] = useState(false);
  const [productosRelacionados, setProductosRelacionados] = useState<Producto[]>([]);
  const { isAuthenticated } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!productId || isNaN(productId)) {
      console.error('ID de producto inválido:', productId);
      toast.error('ID de producto inválido');
      router.push('/tienda');
      return;
    }

    loadProducto();
    checkApartado();
    loadProductosRelacionados();
  }, [productId, isAuthenticated, router]);

  const loadProducto = async () => {
    try {
      const response = await productosApi.getById(productId);
      setProducto(response.data);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      toast.error('Error al cargar el producto');
      router.push('/tienda');
    } finally {
      setLoading(false);
    }
  };

  const checkApartado = async () => {
    try {
      const response = await apartadosApi.verificar(productId);
      setIsApartado(response.data.existe);
    } catch (error) {
      console.error('Error al verificar apartado:', error);
    }
  };

  const loadProductosRelacionados = async () => {
    try {
      const response = await productosApi.getAll();
      const otrosProductos = response.data.filter((p: Producto) => p.id !== productId).slice(0, 4);
      setProductosRelacionados(otrosProductos);
    } catch (error) {
      console.error('Error al cargar productos relacionados:', error);
    }
  };

  const handleApartar = async () => {
    setApartandoProducto(true);
    try {
      if (isApartado) {
        toast('Este producto ya está apartado por ti');
        return;
      }

      await apartadosApi.crear(productId);
      setIsApartado(true);
      toast.success('Producto apartado exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al apartar el producto');
    } finally {
      setApartandoProducto(false);
    }
  };

  const handleApartarConDisclaimer = async () => {
    toast('⚠️ Esto es una demostración para portfolio. Para apartar productos reales, contacta por Instagram @dona_arana_sanlucar', {
      duration: 4000,
      icon: '📱'
    });
    // Llamamos a la función original para la demostración
    handleApartar();
  };

  const handleAddToCart = () => {
    // Aquí iría la lógica del carrito cuando esté implementado
    toast.success('Producto añadido al carrito', {
      icon: '🛒'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${producto?.codigoColor} - ${producto?.codigoTintada}`,
        text: `Mira este producto en Doña Araña`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado al portapapeles');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!producto) {
    return (
      <MainLayout className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Producto no encontrado
            </h1>
            <Button onClick={() => router.push('/tienda')}>
              Volver a la tienda
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] relative z-10">
        <div className="mb-8 flex justify-end">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="bg-white/90 border-2 border-gray-200 hover:border-primary hover:bg-white shadow-md px-4 py-2 h-10 text-base font-medium rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm h-fit">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  {producto.img ? (
                    <Image
                      src={producto.img}
                      alt={`${producto.codigoColor} - ${producto.codigoTintada}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <span className="text-8xl font-bold text-primary/50">
                        {producto.codigoColor.charAt(0)}
                      </span>
                    </div>
                  )}
                  {producto.enPantalla && (
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold text-sm">Destacado</span>
                      </div>
                    </div>
                  )}
                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {producto.codigoColor}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {producto.codigoTintada}
                  </p>
                  {producto.categoria && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-primary font-semibold">{producto.categoria.nombre}</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="bg-white/80 border-gray-200 hover:bg-white shadow-md"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(Number(producto.precio))}
                </div>
                <p className="text-sm text-gray-600">IVA incluido</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => toggleFavorite(producto)}
                variant="outline"
                className={`col-span-2 border-2 shadow-md hover:shadow-lg h-10 rounded-xl px-4 transition-all duration-200 font-medium ${
                  isFavorite(producto.id)
                    ? 'border-red-500 text-white bg-red-500 hover:bg-red-600 hover:border-red-600'
                    : 'border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite(producto.id) ? 'fill-current' : ''}`} />
                {isFavorite(producto.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </Button>

              <Button
                onClick={handleAddToCart}
                className="border-2 shadow-md hover:shadow-lg h-10 rounded-xl px-4 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 text-white transition-all duration-200 font-medium"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Carrito
              </Button>

              <Button
                onClick={handleApartarConDisclaimer}
                disabled={apartandoProducto || isApartado}
                variant="outline"
                className={`border-2 shadow-md hover:shadow-lg h-10 rounded-xl px-4 transition-all duration-200 font-medium ${
                  isApartado
                    ? 'border-green-500 text-white bg-green-500'
                    : 'border-green-500 text-green-500 bg-white hover:bg-green-500 hover:text-white'
                }`}
              >
                <Package className="h-4 w-4 mr-1" />
                {apartandoProducto
                  ? 'Apartando...'
                  : isApartado
                  ? 'Apartado'
                  : 'Apartar'
                }
              </Button>
            </div>

            {isApartado && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm mb-2">
                  Este producto está apartado. Gestiona tus apartados desde tu perfil.
                </p>
                <Link href="/perfil">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-green-300 text-green-700 hover:bg-green-100 transition-all duration-200"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Mi perfil
                  </Button>
                </Link>
              </div>
            )}

            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Información del producto</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-base">Nombre:</span>
                    <span className="font-medium text-base">{producto.codigoColor}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-base">Código:</span>
                    <span className="font-mono text-base">{producto.codigoTintada}</span>
                  </div>
                  {producto.categoria && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-base">Categoría:</span>
                      <span className="font-medium text-base">{producto.categoria.nombre}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 text-base">Precio:</span>
                    <span className="font-bold text-xl">
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(Number(producto.precio))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Productos similares */}
        {productosRelacionados.length > 0 && (
          <div className="mt-16 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Productos similares</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productosRelacionados.map((productoRelacionado) => (
                <div key={productoRelacionado.id} className="transform scale-90">
                  <ElegantProductCard
                    producto={productoRelacionado}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}