'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/main-layout';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { productosApi, apartadosApi, type Producto } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [apartandoProducto, setApartandoProducto] = useState(false);
  const [isApartado, setIsApartado] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadProducto();
    checkApartado();
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
    <MainLayout className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  {producto.img ? (
                    <Image
                      src={producto.img}
                      alt={`${producto.codigoColor} - ${producto.codigoTintada}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                      <span className="text-6xl font-bold text-gray-300">
                        {producto.codigoColor.charAt(0)}
                      </span>
                    </div>
                  )}
                  {producto.enPantalla && (
                    <Badge className="absolute top-4 left-4">
                      Destacado
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {producto.codigoColor}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    {producto.codigoTintada}
                  </p>
                  {producto.categoria && (
                    <Badge variant="secondary">
                      {producto.categoria.nombre}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-3xl font-bold text-amber-600 mb-6">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(Number(producto.precio))}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleApartar}
                disabled={apartandoProducto || isApartado}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {apartandoProducto
                  ? 'Apartando...'
                  : isApartado
                  ? 'Ya apartado'
                  : 'Apartar producto'
                }
              </Button>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Añadir a favoritos
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Información del producto</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código de color:</span>
                    <span className="font-medium">{producto.codigoColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código tintada:</span>
                    <span className="font-medium">{producto.codigoTintada}</span>
                  </div>
                  {producto.categoria && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categoría:</span>
                      <span className="font-medium">{producto.categoria.nombre}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-medium">
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
      </div>
    </MainLayout>
  );
}