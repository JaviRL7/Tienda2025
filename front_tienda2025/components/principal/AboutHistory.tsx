"use client";

import { motion } from "framer-motion";

const AboutHistory = () => {
  return (
    <div className="relative bg-[#F5E6D7] text-[#5C4A42] py-20 px-8 overflow-hidden">
      {/* Fondos aleatorios */}
      <img
        src="/fondo/1.png"
        className="absolute top-1 left-0 w-1/3 opacity-70 rotate-2"
        alt="Fondo 1"
      />
      <img
        src="/fondo/2.png"
        className="absolute top-[55%] left-1/4 w-1/4 opacity-30 -rotate-3"
        alt="Fondo 2"
      />
      <img
        src="/fondo/3.png"
        className="absolute bottom-0 right-[-10%] w-1/3 opacity-30 rotate-2"
        alt="Fondo 3"
      />
      <img
        src="/fondo/4.png"
        className="absolute top right-1 w-1/3 opacity-20"
        alt="Fondo 4"
      />

      {/* Contenido */}
      <motion.h2
        className="relative text-6xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Nuestra Historia
      </motion.h2>

      {/* Primera Fila */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12">
        <motion.img
          src="/conocenos/5.png"
          alt="Nuestra Tienda"
          className="w-full md:w-[650px] object-cover transform rotate-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.p
          className="text-4xl font-semibold md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Desde hace años, nos dedicamos a ofrecer los mejores materiales para dar vida a tus creaciones.
          Nuestra pasión por la lana nos ha convertido en el lugar de referencia para tejedoras y amantes de las manualidades.
        </motion.p>
      </div>


      <div className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-12 -mt-60">
        <motion.img
          src="/conocenos/6.png"
          alt="Clientes felices"
          className="w-full md:w-[650px] object-cover transform -rotate-9"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.p
          className="text-4xl font-semibold md:w-1/2 text-center md:text-right"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Nos encanta compartir nuestra experiencia y ayudarte a elegir los colores y texturas perfectas para tus proyectos.
          ¡Ven a conocernos y forma parte de nuestra familia lanera!
        </motion.p>
      </div>
    </div>
  );
};

export default AboutHistory;
