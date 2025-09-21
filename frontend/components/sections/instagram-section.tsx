"use client";

import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function InstagramSection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-accent/30 via-background to-secondary/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Image Side */}
          <div className="relative w-full order-2 lg:order-2">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <img
                src="/instagram/captura.png?v=2"
                alt="Instagram de Doña Araña"
                className="w-full h-auto rounded-lg"
              />

              {/* Instagram icon */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#E1306C] to-[#F56040] rounded-full flex items-center justify-center shadow-xl">
                <FaInstagram className="text-white w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  <span className="block text-primary text-2xl md:text-3xl lg:text-4xl mb-8">Síguenos en</span>
                  <span
                    className="block"
                    style={{
                      fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                      lineHeight: "1.3"
                    }}
                  >
                    Instagram
                  </span>
                </h2>

                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    Síguenos en Instagram para ver más trabajos, procesos creativos y momentos especiales de nuestro taller. Tu apoyo nos ayuda mucho y te mantendrá conectado con nuestra comunidad artesanal.
                  </p>

                  <p className="text-primary text-xl md:text-2xl font-medium">
                    ¡Únete a nuestra comunidad!
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  variant="instagram"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <a
                    href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="mr-2 h-5 w-5" />
                    Síguenos
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <a href="/galeria">
                    Ver Galería
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}