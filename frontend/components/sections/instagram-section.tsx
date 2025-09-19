"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

export function InstagramSection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-accent/30 via-background to-secondary/40">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image Side - Larger and more prominent */}
          <motion.div
            className="lg:col-span-3 relative"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main Instagram Image Container */}
            <div className="relative mx-auto max-w-2xl">
              {/* Instagram Frame with margins */}
              <div className="relative p-8 bg-white rounded-3xl shadow-2xl">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#E1306C]/10 to-[#F56040]/10">
                  <img
                    src="/instagram/1.png"
                    alt="Instagram de Doña Araña"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Instagram UI elements */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#E1306C] to-[#F56040] rounded-full flex items-center justify-center">
                      <FaInstagram className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">dona_arana_sanlucar</span>
                  </div>
                  <div className="text-gray-600">⋯</div>
                </div>

                {/* Instagram bottom bar simulation */}
                <div className="absolute bottom-2 left-2 right-2 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 text-gray-800">♡</div>
                      <div className="w-6 h-6 text-gray-800">💬</div>
                      <div className="w-6 h-6 text-gray-800">➤</div>
                    </div>
                    <div className="w-6 h-6 text-gray-800">🏷</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold">dona_arana_sanlucar</span> Más que una tienda, una familia ❤️ #lanas #manualidades #sanlucar
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#E1306C] to-[#F56040] rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <FaInstagram className="text-white text-xl" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full backdrop-blur-sm"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-accent/40 rounded-full backdrop-blur-sm"></div>
            </div>
          </motion.div>

          {/* Content Side - More compact */}
          <motion.div
            className="lg:col-span-2 text-center lg:text-left container-spacing"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="brand-text block text-primary">Síguenos en</span>
                  Instagram
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Descubre nuestras últimas creaciones, proyectos de clientas y
                  encuentra inspiración para tus próximas manualidades.
                </p>

                <p className="brand-text text-primary text-xl">
                  ¡Únete a nuestra comunidad lanera!
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  variant="instagram"
                  size="lg"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="mr-2 h-5 w-5" />
                    Visítanos en Instagram
                  </a>
                </Button>

                <Button
                  variant="artisan"
                  size="lg"
                >
                  Ver Galería
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}