'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClassesSection() {
  return (
    <motion.section
      className="section-spacing section-accent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/clases.webp"
                alt="Clases de manualidades"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/80 rounded-full flex items-center justify-center shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.1 }}
            >
              <GraduationCap className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>
          <motion.div
            className="container-spacing"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span
                  className="block text-3xl md:text-4xl lg:text-5xl mb-3"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                    lineHeight: "1.3"
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Aprende con nosotras
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-2xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Apúntate a nuestras clases: porque tejer juntas siempre es más divertido.
              </motion.p>
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Compartimos momentos especiales creando juntas, aprendiendo nuevas
                técnicas y disfrutiendo de la compañía de otras apasionadas por las
                manualidades. Para más información sobre clases, horarios y precios,
                escríbenos por Instagram @dona_arana_sanlucar.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="w-fit"
                >
                  <a href="https://www.instagram.com/dona_arana_sanlucar/?hl=es" target="_blank" rel="noopener noreferrer">
                    Pregúntanos por Instagram
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}