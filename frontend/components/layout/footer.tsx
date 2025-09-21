'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ASSETS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="footer-gradient border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 container-spacing">
            <div className="flex items-center">
              <img
                src={ASSETS.LOGOS.HORIZONTAL}
                alt="Doña Araña"
                className="h-20 md:h-24 lg:h-28 w-auto"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Más que una tienda,{" "}
                <span className="brand-text">una familia</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Tu tienda de confianza para lanas, hilos y accesorios de manualidades en Sanlúcar de Barrameda.
                Creando vínculos a través del hilo desde hace años.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Servicios</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/tienda" className="hover:text-primary transition-colors">Productos</Link></li>
              <li><Link href="/tienda" className="hover:text-primary transition-colors">Categorías</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Clases y Talleres</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Ofertas especiales</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-primary" />
                Sanlúcar de Barrameda
              </p>
              <p>Jrlsanlucar11@gmail.com</p>
              <div className="pt-4 border-t border-muted">
                <p className="text-xs">
                  Desarrollado con ❤️ por<br />
                  Javier Rodríguez López
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-muted mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Doña Araña. Todos los derechos reservados.
            <span className="block mt-2 brand-text">
              Tejiendo sueños, creando memorias
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}