"use client";

import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function InstagramSection() {
  return (
    <motion.section
      className="section-spacing bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Image Side */}
          <motion.div
            className="relative w-full order-2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <motion.img
                src="/instagram/captura.png?v=2"
                alt="Instagram de Doña Araña"
                className="w-full h-auto rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Instagram icon */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#E1306C] to-[#F56040] rounded-full flex items-center justify-center shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.1 }}
              >
                <FaInstagram className="text-white w-12 h-12" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="text-center lg:text-left order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.span
                    className="block text-primary text-2xl md:text-3xl lg:text-4xl mb-8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Síguenos en
                  </motion.span>
                  <motion.span
                    className="block mt-8 mb-12"
                    style={{
                      fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                      lineHeight: "1.3"
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Instagram
                  </motion.span>
                </motion.h2>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.p
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    Síguenos en Instagram para ver más trabajos, procesos creativos y momentos especiales de nuestro taller. Tu apoyo nos ayuda mucho y te mantendrá conectado con nuestra comunidad.
                  </motion.p>

                  <motion.p
                    className="text-primary text-xl md:text-2xl font-medium"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    ¡Únete a nuestra comunidad!
                  </motion.p>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <a href="/galeria">
                      Ver Galería
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}