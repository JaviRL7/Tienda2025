"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Producto } from "@/lib/api";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  producto: Producto;
  variant?: "default" | "compact" | "featured";
  className?: string;
  showQuickActions?: boolean;
}

export default function ProductCard({
  producto,
  variant = "default",
  className,
  showQuickActions = true
}: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(producto);
    openCart();
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Lógica para añadir/quitar de favoritos
    console.log("Toggle favorito:", producto.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Lógica para vista rápida
    console.log("Vista rápida:", producto.id);
  };

  const cardVariants = {
    default: "group cursor-pointer transition-all duration-200 hover:shadow-lg",
    compact: "group cursor-pointer transition-all duration-200 hover:shadow-md",
    featured: "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
  };

  return (
    <Link href={`/tienda/${producto.id}`}>
      <Card className={cn(cardVariants[variant], className)}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
            {producto.img ? (
              <Image
                src={producto.img}
                alt={`${producto.codigoColor} - ${producto.codigoTintada}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <span className="text-4xl font-bold text-muted-foreground/30">
                  {producto.codigoColor.charAt(0)}
                </span>
              </div>
            )}

            {/* Quick Actions Overlay */}
            {showQuickActions && (
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 shrink-0"
                    onClick={handleQuickView}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Vista rápida</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 shrink-0"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Añadir a favoritos</span>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir TEST
                  </Button>
                </div>
              </div>
            )}

            {/* Badge */}
            {producto.enPantalla && (
              <div className="absolute left-2 top-2">
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Destacado
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start space-y-2 p-4">
          {/* Product Info */}
          <div className="flex w-full items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium leading-tight">
                {producto.codigoColor}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {producto.codigoTintada}
              </p>
              {producto.categoria && (
                <p className="truncate text-xs text-muted-foreground">
                  {producto.categoria.nombre}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(Number(producto.precio))}
              </p>
            </div>
          </div>

          {/* Mobile Add to Cart */}
          {showQuickActions && variant === "compact" && (
            <Button
              size="sm"
              className="w-full md:hidden"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Añadir al carrito
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}