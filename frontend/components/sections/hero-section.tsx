'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, Heart, Users } from 'lucide-react';
import { useAuthModal } from '@/store/auth-modal-context';

export default function HeroSection() {
  const { openLogin, openRegister } = useAuthModal();
  return (
    <section className="relative section-spacing lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
                  <span className="block mb-8 text-4xl md:text-5xl lg:text-6xl">
                    Crea tu cuenta en
                  </span>
                  <span
                    className="block text-4xl md:text-5xl lg:text-6xl"
                    style={{
                      fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                      lineHeight: "1.2"
                    }}
                  >
                    Doña Araña
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Regístrate para reservar tus productos favoritos, resolver tus dudas y ser parte de nuestra comunidad de amantes de lo artesanal. Tejiendo juntas, todo es más fácil y divertido.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <Button
                  size="lg"
                  onClick={openRegister}
                  className="w-fit"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Únete a nuestra comunidad
                </Button>
                <p className="text-lg text-foreground font-medium">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={openLogin}
                    className="text-primary hover:text-primary/80 font-semibold underline decoration-2 underline-offset-4 hover:decoration-primary/60 transition-all duration-200"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/imagen1.jpg"
                alt="Doña Araña - Lanas y manualidades"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}