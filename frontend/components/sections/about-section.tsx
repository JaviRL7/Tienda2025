'use client';

import { Heart, Star } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/imagen2.webp"
                alt="Nuestra tienda y equipo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 left-6 bg-accent/90 backdrop-blur rounded-2xl p-4 shadow-lg">
              <p className="text-primary font-script text-2xl">
                Más que una tienda
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span
                  className="block text-3xl md:text-4xl lg:text-5xl mb-3"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                    lineHeight: "1.3"
                  }}
                >
                  Quiénes somos
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                En la calle San Juan 76, en pleno corazón de Sanlúcar de Barrameda, está Doña Araña: una tienda de lanas con talleres de punto, pensada como un espacio acogedor donde aprender, crear y compartir. Creemos en la tradición, en lo hecho a mano y en la alegría de tejer en compañía.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-2xl shadow-sm">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Productos con cariño
                </h3>
                <p className="text-base text-muted-foreground">Cada material está elegido pensando en ti</p>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl shadow-sm">
                <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
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