import Image from "next/image";

const ClassPromotion = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#EADFD6] px-12 md:px-20 py-10 md:py-16 rounded-2xl shadow-lg">
      {/* Imagen redondeada y contenida */}
      <div className="flex-1 max-w-full md:max-w-[50%]">
        <Image
          src="/principal/clases.webp" // Cambia esta ruta por la correcta
          alt="Clases"
          width={500}
          height={400}
          className="rounded-lg object-cover w-full h-auto"
        />
      </div>

      {/* Contenedor de texto */}
      <div className="flex-1 md:ml-12 mt-8 md:mt-0 text-gray-800">
        <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-snug">
          ¡Apúntate a nuestras clases!
        </h2>
        <p className="text-xl md:text-3xl leading-relaxed">
          Descubre el arte de la pintura con nuestras clases personalizadas para todos los niveles. 
          Aprende técnicas nuevas y mejora tus habilidades en un entorno divertido y colaborativo. 
          ¡No pierdas la oportunidad de desarrollar tu creatividad!
        </p>
      </div>
    </div>
  );
};

export default ClassPromotion;
