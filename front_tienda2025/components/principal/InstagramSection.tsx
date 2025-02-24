"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const instagramImages = [
  "/public/instagram1.jpg",
  "/public/instagram2.jpg",
  "/public/instagram3.jpg",
  "/public/instagram4.jpg",
];

const InstagramSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % instagramImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F4E1D2] text-[#5C4A42] text-center py-40">
      <motion.h2
        className="text-5xl font-extrabold mb-6 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <FaInstagram className="text-[#E1306C]" /> Síguenos en Instagram
      </motion.h2>
      <motion.p
        className="text-2xl mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Descubre nuestras últimas novedades, creaciones y eventos. ¡Únete a nuestra comunidad!
      </motion.p>
      
      <div className="relative mx-auto w-3/4 h-[400px] overflow-hidden">
        <AnimatePresence>
          {instagramImages.map((src, index) =>
            index === currentIndex ? (
              <motion.img
                key={index}
                src={src}
                alt={`Instagram ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            ) : null
          )}
        </AnimatePresence>
      </div>
      
      <a
        href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 bg-[#E1306C] text-white text-xl font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Visítanos en Instagram
      </a>
    </div>
  );
};

export default InstagramSection;
