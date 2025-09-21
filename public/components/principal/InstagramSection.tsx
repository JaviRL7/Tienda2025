"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const InstagramSection = () => {
  return (
    <div className="bg-[#F4E1D2] text-[#5C4A42] py-32 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
      <img 
        src="/instagram/1.png" 
        alt="Instagram preview" 
        className="w-1/5 md:w-1/7 h-auto object-cover"
      />
      <div className="text-center md:text-left max-w-lg">
        <motion.h2
          className="text-7xl font-extrabold mb-8 flex items-center justify-center md:justify-start gap-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FaInstagram className="text-[#E1306C]" /> Síguenos en Instagram
        </motion.h2>
        <motion.p
          className="text-4xl mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Descubre nuestras últimas novedades, creaciones y eventos. ¡Únete a nuestra comunidad!
        </motion.p>
        <motion.a
          href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-[#E1306C] text-white text-2xl font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-110"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Visítanos en Instagram
        </motion.a>
      </div>
    </div>
  );
};

export default InstagramSection;
