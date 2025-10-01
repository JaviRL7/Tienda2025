'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, Heart, Users } from 'lucide-react';
import { useAuthModal } from '@/store/auth-modal-context';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { openLogin, openRegister } = useAuthModal();
  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.span
                    className="block mb-4 md:mb-6 lg:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Crea tu cuenta en
                  </motion.span>
                  <motion.span
                    className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                    style={{
                      fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                      lineHeight: "1.2"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Doña Araña
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Regístrate para reservar tus productos favoritos, resolver tus dudas y ser parte de nuestra comunidad de amantes de lo artesanal. Tejiendo juntas, todo es más fácil y divertido.
                </motion.p>
              </div>
            </div>
            <motion.div
              className="flex flex-col gap-4 md:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={openRegister}
                    className="w-full sm:w-fit text-sm md:text-base"
                  >
                    <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Únete a nuestra comunidad
                  </Button>
                </motion.div>
                <p className="text-sm sm:text-base md:text-lg text-foreground font-medium">
                  ¿Ya tienes cuenta?{' '}
                  <motion.button
                    onClick={openLogin}
                    className="text-primary hover:text-primary/80 font-semibold underline decoration-2 underline-offset-4 hover:decoration-primary/60 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Inicia sesión
                  </motion.button>
                </p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/imagen1.jpg"
                alt="Doña Araña - Lanas y manualidades"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}