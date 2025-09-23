'use client';

import { useRouter } from 'next/navigation';
import { Package, Clock, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import type { Apartado } from '@/lib/api';

interface ApartadosTabProps {
  apartados: Apartado[];
  apartadosLoading: boolean;
  onEliminarApartado: (apartadoId: number) => void;
}

export default function ApartadosTab({ apartados, apartadosLoading, onEliminarApartado }: ApartadosTabProps) {
  const router = useRouter();

  return (
    <TabsContent value="apartados">
      <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl">
        <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-6">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <span
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
              className="flex-1"
            >
              Mis productos apartados
            </span>
            <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-xl text-sm font-medium border border-primary/30">
              {apartados.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 mb-2">Información importante sobre apartados</h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>• Los productos apartados se reservan por un máximo de <strong>1 mes</strong></p>
                  <p>• Para confirmar tu compra o extender el apartado, contáctanos por Instagram:<br/><strong>@dona_arana_sanlucar</strong></p>
                  <p>• Pasado el tiempo límite, el producto volverá a estar disponible para otros clientes</p>
                </div>
              </div>
            </div>
          </div>

          {apartadosLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Cargando tus productos...</p>
            </div>
          ) : apartados.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-8 rounded-2xl bg-primary/10 border-2 border-primary/20 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Package className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Aún no tienes productos apartados
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                Descubre nuestras lanas y materiales únicos. Aparta los que más te gusten para no perderlos y crear tus proyectos especiales.
              </p>
              <Button
                onClick={() => router.push('/tienda')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                size="lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Explorar la Tienda
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {apartados.map((apartado) => (
                <div
                  key={apartado.id}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">
                          {apartado.producto.codigoColor}
                        </h4>
                        <p className="text-gray-600 font-medium">
                          {apartado.producto.codigoTintada}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Apartado: <span className="font-medium">{new Date(apartado.fechaApartado).toLocaleDateString()}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>Expira: <span className="font-medium">{new Date(apartado.fechaExpiracion).toLocaleDateString()}</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(apartado.producto.precio)}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/tienda/${apartado.producto.id}`)}
                          className="border-2 border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-200 rounded-xl px-4 py-2"
                        >
                          Ver Producto
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onEliminarApartado(apartado.id)}
                          className="border-2 border-red-200 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-xl px-4 py-2"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}