'use client';

import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { useFavorites } from '@/store/favorites';
import ElegantProductCard from '@/components/product/elegant-product-card';

export default function FavoritesTab() {
  const { favorites } = useFavorites();
  const router = useRouter();

  return (
    <TabsContent value="favoritos">
      <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl">
        <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-6">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <div className="p-3 rounded-xl bg-rose-100 border border-rose-200">
              <Heart className="h-5 w-5 text-rose-600" />
            </div>
            <span
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
              className="flex-1"
            >
              Mis productos favoritos
            </span>
            <span className="bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl text-sm font-medium border border-rose-200">
              {favorites.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-8 rounded-2xl bg-rose-50 border-2 border-rose-100 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Heart className="h-16 w-16 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Aún no tienes productos favoritos
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                Explora nuestra tienda y marca con ❤️ los productos que más te gusten para encontrarlos fácilmente aquí.
              </p>
              <Button
                onClick={() => router.push('/tienda')}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                size="lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Explorar la Tienda
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((producto) => (
                <ElegantProductCard
                  key={producto.id}
                  producto={producto}
                  className="max-w-sm mx-auto"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}