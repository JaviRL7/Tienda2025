'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Heart, Info, Star } from 'lucide-react';
import { useWishlist } from '@/store/wishlist-context';
import type { Producto, ProductoColor } from '@/lib/mock-data';

interface ElegantProductCardProps {
  producto: Producto;
  onAddToCart?: (producto: Producto, color: ProductoColor) => void;
  onAddToWishlist?: (producto: Producto) => void;
  className?: string;
}

export default function ElegantProductCard({
  producto,
  onAddToCart,
  onAddToWishlist,
  className = ""
}: ElegantProductCardProps) {
  const [selectedColorId, setSelectedColorId] = useState<string>(
    producto.colores[0]?.colorId.toString() || ""
  );
  const [isHovered, setIsHovered] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();

  const selectedColor = producto.colores.find(
    c => c.colorId.toString() === selectedColorId
  ) || producto.colores[0];

  const precioMinimo = Math.min(...producto.colores.map(c => c.precioBase));
  const precioMaximo = Math.max(...producto.colores.map(c => c.precioBase));
  const precioDisplay = precioMinimo === precioMaximo
    ? `${precioMinimo.toFixed(2)} €`
    : `${precioMinimo.toFixed(2)} - ${precioMaximo.toFixed(2)} €`;

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
    <div
      className={`group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {producto.destacado && (
          <div className="flex items-center gap-1 text-amber-600 font-semibold text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span>Destacado</span>
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isWishlisted
            ? 'bg-rose-500 text-white'
            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-rose-500'
        } hover:scale-110`}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100">
        {selectedColor.imagenPrincipal && (
          <Image
            src={selectedColor.imagenPrincipal}
            alt={producto.nombre}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-20' : 'opacity-0'
          }`}
        />

        {/* Hover Content */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-white text-center space-y-3">
            <div className="text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
              {variante?.nombreVariante} • {variante?.pesoOvillo}g
            </div>
            <div className="text-xs bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
              {variante?.metrosOvillo}m • Aguja {variante?.agujaRecomendadaMin}-{variante?.agujaRecomendadaMax}mm
            </div>
            <Link href={`/tienda/${producto.slug}`}>
              <Button
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 transition-all mt-2"
              >
                <Info className="h-4 w-4 mr-1" />
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Brand and Category */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold">{typeof producto.marca === 'string' ? producto.marca : producto.marca?.nombre}</span>
          <span>•</span>
          <span>{typeof producto.categoria === 'string' ? producto.categoria : producto.categoria?.nombre}</span>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2 min-h-[3.5rem]">
            {producto.nombre}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
            {producto.descripcionCorta}
          </p>
        </div>

        {/* Color Selection */}
        {producto.colores.length > 1 && (
          <div className="space-y-2">
            <Select value={selectedColorId} onValueChange={setSelectedColorId}>
              <SelectTrigger className="w-full border-gray-200 rounded-xl">
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                {producto.colores.map((color) => (
                  <SelectItem
                    key={color.colorId}
                    value={color.colorId.toString()}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.color.hexColor }}
                      />
                      {color.color.nombre}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Price and Actions */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {precioDisplay}
            </div>
            {selectedColor.stockActual <= 5 && selectedColor.stockActual > 0 && (
              <Badge variant="destructive" className="text-xs">
                ¡Últimas unidades!
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={selectedColor.stockActual === 0}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {selectedColor.stockActual === 0 ? 'Sin stock' : 'Añadir al carrito'}
            </Button>

            <Link href={`/tienda/${producto.slug}`} className="block">
              <Button
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl py-3 font-semibold transition-all duration-200"
              >
                Ver detalles completos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}