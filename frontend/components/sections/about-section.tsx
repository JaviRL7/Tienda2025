'use client';

import { Heart, Star } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-32 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-rose-50/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/imagen2.webp"
                alt="Nuestra tienda y equipo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur rounded-3xl p-6 shadow-xl border border-primary/20">
              <p className="text-primary font-script text-3xl">
                Más que una tienda
              </p>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span
                  className="block"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                    lineHeight: "1.2"
                  }}
                >
                  Quiénes somos
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                En la calle San Juan 76, en pleno corazón de Sanlúcar de Barrameda, está Doña Araña: una tienda de lanas con talleres de punto, pensada como un espacio acogedor donde aprender, crear y compartir. Creemos en la tradición, en lo hecho a mano y en la alegría de tejer en compañía.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex flex-col items-start p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10">
                <Heart className="h-14 w-14 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">
                  Productos con cariño
                </h3>
                <p className="text-base text-muted-foreground">Cada material está elegido pensando en ti</p>
              </div>
              <div className="flex flex-col items-start p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10">
                <Star className="h-14 w-14 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">
                  Inspírate aquí
                </h3>
                <p className="text-base text-muted-foreground">Encuentra ideas para empezar tu próximo proyecto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}