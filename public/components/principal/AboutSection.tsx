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

const AboutCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#E3C8B5] text-[#5C4A42] text-center py-40">
      <motion.h2
        className="text-6xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Más que una tienda, una familia
      </motion.h2>
      <motion.p
        className="text-3xl mb-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Tu tienda de lanas de confianza en Sanlúcar de Barrameda. No solo vendemos productos, creamos comunidad, tradición y calidez en cada ovillo.
      </motion.p>

      {/* Carrusel de imágenes con transición automática */}
      <div className="relative mx-auto w-3/4 h-[500px] overflow-hidden">
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

export default AboutCarousel;
