'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Info, Star } from 'lucide-react';
import { useFavorites } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import type { Producto } from '@/lib/api';

interface ElegantProductCardProps {
  producto: Producto;
  className?: string;
}

export default function ElegantProductCard({
  producto,
  className = ""
}: ElegantProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(producto);
    toast.success('Producto añadido al carrito');
    openCart();
  };

  const isListView = className?.includes('flex-row');

  return (
    <div
      className={`group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 ${isListView ? 'overflow-visible' : 'overflow-hidden'} border border-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {producto.enPantalla && (
          <div className="flex items-center gap-1 text-amber-600 font-semibold text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span>Destacado</span>
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(producto);
        }}
        className={`absolute top-4 right-4 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-sm hover:scale-110 ${
          isFavorite(producto.id)
            ? 'text-rose-500'
            : 'text-gray-600 hover:text-rose-500'
        }`}
      >
        <Heart className={`h-4 w-4 ${isFavorite(producto.id) ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <div className={`relative ${isListView ? 'w-64 h-64 flex-shrink-0' : 'aspect-square'} overflow-hidden ${isListView ? 'rounded-l-3xl' : 'rounded-t-3xl'} bg-gradient-to-br from-gray-50 to-gray-100`}>
        {producto.img ? (
          <Image
            src={producto.img}
            alt={producto.codigoColor}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/50">
              {producto.codigoColor.charAt(0)}
            </span>
          </div>
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
              {producto.categoria?.nombre || 'Producto'}
            </div>
            <Link href={`/tienda/${producto.id}`}>
              <Button
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 transition-all mt-2"
              >
                <Info className="h-4 w-4 mr-1" />
                Ver en detalle
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-6 space-y-4 ${isListView ? 'flex-1 flex flex-col justify-between min-w-0' : ''}`}>
        {/* Brand and Category */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold">Katia</span>
          <span>•</span>
          <span>{producto.categoria?.nombre || 'Lanas'}</span>
        </div>


        {/* Price and Actions */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
              }).format(Number(producto.precio))}
            </div>
            {producto.enPantalla && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                Destacado
              </Badge>
            )}
          </div>

          <div className={`space-y-3 ${isListView ? 'flex flex-row gap-3 space-y-0' : ''}`}>
            <Button
              onClick={handleAddToCart}
              className={`${isListView ? 'flex-1' : 'w-full'} bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-semibold transition-all duration-200 hover:shadow-lg`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Añadir al carrito
            </Button>

            <Link href={`/tienda/${producto.id}`} className={isListView ? 'flex-1' : 'block'}>
              <Button
                variant="outline"
                className={`${isListView ? 'w-full' : 'w-full'} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl py-3 font-semibold transition-all duration-200`}
              >
                Ver en detalle
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}