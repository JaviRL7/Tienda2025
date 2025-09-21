'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Heart, Info, Star } from 'lucide-react';
import { useWishlist } from '@/store/wishlist-context';
import type { Producto, ProductoColor } from '@/lib/mock-data';

interface EnhancedProductCardProps {
  producto: Producto;
  onAddToCart?: (producto: Producto, color: ProductoColor) => void;
  onAddToWishlist?: (producto: Producto) => void;
  className?: string;
}

export default function EnhancedProductCard({
  producto,
  onAddToCart,
  onAddToWishlist,
  className = ""
}: EnhancedProductCardProps) {
  const [selectedColorId, setSelectedColorId] = useState<string>(
    producto.colores[0]?.colorId.toString() || ""
  );

  const { toggleWishlist, isInWishlist } = useWishlist();

  const selectedColor = producto.colores.find(
    c => c.colorId.toString() === selectedColorId
  ) || producto.colores[0];

  const precioMinimo = Math.min(...producto.colores.map(c => c.precioBase));
  const precioMaximo = Math.max(...producto.colores.map(c => c.precioBase));
  const precioDisplay = precioMinimo === precioMaximo
    ? `€${precioMinimo.toFixed(2)}`
    : `€${precioMinimo.toFixed(2)} - €${precioMaximo.toFixed(2)}`;

  const variante = producto.variantes[0];
  const isWishlisted = isInWishlist(producto.id);

  const handleAddToCart = () => {
    if (selectedColor && onAddToCart) {
      onAddToCart(producto, selectedColor);
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(producto);
    if (onAddToWishlist) {
      onAddToWishlist(producto);
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col ${className}`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {producto.destacado && (
          <div className="relative">
            <Badge className="text-xs bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5 font-medium tracking-wide flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              <span className="relative z-10">Destacado</span>
            </Badge>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 blur-sm opacity-40 rounded-full"></div>
          </div>
        )}
        {selectedColor?.precioOferta && (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            ¡Oferta!
          </Badge>
        )}
        {selectedColor?.stockActual < 10 && selectedColor?.stockActual > 0 && (
          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
            Últimas unidades
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
        onClick={handleWishlistToggle}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>

      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={selectedColor?.imagenPrincipal || '/productos/placeholder.jpg'}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay con información rápida */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center space-y-2">
            <div className="text-sm font-medium">
              {variante?.grosor} • {variante?.pesoOvillo}g
            </div>
            <div className="text-xs">
              {variante?.metrosOvillo}m • Aguja {variante?.agujaRecomendadaMin}-{variante?.agujaRecomendadaMax}mm
            </div>
            <Link href={`/tienda/${producto.slug}`}>
              <Button variant="secondary" size="sm" className="mt-2">
                <Info className="h-4 w-4 mr-1" />
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido del producto */}
      <div className="p-6 flex flex-col space-y-4">
        {/* Marca y categoría */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{producto.marca.nombre}</span>
          <span>•</span>
          <span>{producto.categoria.nombre}</span>
        </div>

        {/* Nombre del producto */}
        <div className="h-24">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2">
            {producto.nombre}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {producto.descripcionCorta}
          </p>
        </div>


        {/* Precio */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            {selectedColor?.precioOferta ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold text-green-600">
                  {selectedColor.precioOferta.toFixed(2)} €
                </span>
                <span className="text-base text-muted-foreground line-through">
                  {selectedColor.precioBase.toFixed(2)} €
                </span>
              </div>
            ) : (
              <div className="text-xl font-bold">
                {selectedColor?.precioBase.toFixed(2)} €
              </div>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-3 pt-2">
          {selectedColor?.disponible && selectedColor?.stockActual > 0 ? (
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="default"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Añadir al carrito
            </Button>
          ) : (
            <Button disabled className="w-full" size="default">
              Sin stock
            </Button>
          )}

          <Link href={`/tienda/${producto.slug}`} className="block">
            <Button variant="outline" className="w-full" size="default">
              Ver detalles
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}