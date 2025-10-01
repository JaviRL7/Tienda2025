'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  phone?: string;
  className?: string;
}

export default function ContactSection({
  title = "¿Tienes alguna pregunta?",
  subtitle = "Contacta con nosotros",
  description = "Nuestro equipo está aquí para ayudarte con cualquier consulta sobre nuestros productos o servicios",
  email = "jrlsanlucar11@gmail.com",
  phone = "856 36 25 28",
  className = ""
}: ContactSectionProps) {

  return (
    <motion.section
      className={`py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container px-4 md:px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="space-y-3 md:space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {title}
            </motion.h2>
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl font-semibold opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {subtitle}
            </motion.h3>
            <motion.p
              className="text-base sm:text-lg md:text-xl opacity-80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {description}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="flex items-center space-x-2 md:space-x-3 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Phone className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-base sm:text-lg md:text-xl font-medium">{phone}</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 md:space-x-3 text-white/90"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-base sm:text-lg md:text-xl font-medium break-all">{email}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}