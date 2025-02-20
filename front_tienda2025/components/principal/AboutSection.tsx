"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/principal/imagen1.jpg",
  "/principal/imagen2.webp",
  "/principal/imagen3.jpg",
  "/principal/imagen4.jpg",
  "/principal/imagen5.jpg",
];

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar la imagen automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#E3C8B5] text-[#5C4A42] text-center py-40">
      <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
      <p className="text-lg mb-8">Somos una tienda comprometida con la calidad.</p>

      {/* Carrusel de imágenes con transición automática */}
      <div className="relative mx-auto w-3/4 h-[600px] overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence>
          {images.map((src, index) =>
            index === currentIndex ? (
              <motion.img
                key={index}
                src={src}
                alt={`Imagen ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutSection;
