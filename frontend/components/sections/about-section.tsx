'use client';

import { Heart, Star, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      className="py-12 md:py-20 lg:py-32 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/imagen2.webp"
                alt="Nuestra tienda y equipo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.1 }}
            >
              <Hand className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span
                  className="block"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                    lineHeight: "1.2"
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Quiénes somos
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                En la calle San Juan 76, en pleno corazón de Sanlúcar de Barrameda, está Doña Araña: una tienda de lanas con talleres de punto, pensada como un espacio acogedor donde aprender, crear y compartir. Creemos en la tradición, en lo hecho a mano y en la alegría de tejer en compañía.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-4 md:gap-6 pt-2 md:pt-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="flex flex-col items-center text-center p-4 md:p-6 bg-background/60 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-3 md:mb-4 text-primary" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3">
                  Productos con cariño
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">Cada material está elegido pensando en ti</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center p-4 md:p-6 bg-background/60 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <Star className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-3 md:mb-4 text-primary" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3">
                  Inspírate aquí
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">Encuentra ideas para empezar tu próximo proyecto</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}