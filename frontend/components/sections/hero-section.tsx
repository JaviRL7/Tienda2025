'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, Heart, Users } from 'lucide-react';
import { useAuthModal } from '@/store/auth-modal-context';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { openLogin, openRegister } = useAuthModal();
  return (
    <section className="relative section-spacing lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.span
                    className="block mb-8 text-4xl md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Crea tu cuenta en
                  </motion.span>
                  <motion.span
                    className="block text-4xl md:text-5xl lg:text-6xl"
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
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
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
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={openRegister}
                    className="w-fit"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Únete a nuestra comunidad
                  </Button>
                </motion.div>
                <p className="text-lg text-foreground font-medium">
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
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
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
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}