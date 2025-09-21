'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export default function ClassesSection() {
  return (
    <section className="section-spacing section-accent">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/clases.webp"
                alt="Clases de manualidades"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div className="container-spacing">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span
                  className="block text-3xl md:text-4xl lg:text-5xl mb-3"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                    lineHeight: "1.3"
                  }}
                >
                  Aprende con nosotros
                </span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                Apúntate a nuestras clases: porque tejer juntas siempre es más divertido.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Compartimos momentos especiales creando juntas, aprendiendo nuevas
                técnicas y disfrutando de la compañía de otras apasionadas por las
                manualidades. Puedes preguntarnos por Instagram también.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                asChild
                className="w-fit"
              >
                <a href="mailto:info@donaarana.com?subject=Consulta sobre clases&body=Hola! Me interesa saber más sobre las clases de punto. ¿Podrían darme información sobre horarios y precios? Gracias!">
                  Pregúntanos sobre las clases
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}