"use client";

import { useState } from "react";
import { ShoppingBasket, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomModal from "./ui/modal";
import Register from "./registros/register";

const Navbar = () => {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#E3C8B5] font-[Bodoni Moda] text-2xl text-[#5C4A42] font-bold px-8 relative h-28 flex items-center">
      
      {/* Contenedor centrado: Logo y enlaces */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-x-10">
        {/* Enlaces a la izquierda del logo */}
        <p onClick={() => router.push("/sobre-nosotros")} className="cursor-pointer hover:text-white">Sobre nosotros</p>
        <p onClick={() => router.push("/clases")} className="cursor-pointer hover:text-white">Clases</p>

        {/* Logo centrado */}
        <img 
          src="/logos/logo2.png" 
          alt="Logo" 
          className="h-20 cursor-pointer mx-4" 
          onClick={() => router.push("/")} 
        />

        {/* Enlaces a la derecha del logo */}
        <p onClick={() => router.push("/tienda")} className="cursor-pointer hover:text-white">Productos</p>
        <p onClick={() => router.push("/accesorios")} className="cursor-pointer hover:text-white">Accesorios</p>
      </div>

      {/* Bloque de sesión completamente a la derecha */}
      <div className="flex items-center space-x-6 ml-auto">
        <Heart className="cursor-pointer hover:text-white" size={28} onClick={() => router.push("/favorites")} />
        <ShoppingBasket className="cursor-pointer hover:text-white" size={28} onClick={() => router.push("/cart")} />
        <p onClick={() => router.push("/auth/login")} className="cursor-pointer font-bold hover:text-white">Iniciar sesión</p>
        <p onClick={() => setIsRegisterOpen(true)} className="cursor-pointer font-bold hover:text-white">Registrarse</p>
      </div>

      {/* Modal de Registro */}
      <CustomModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      </CustomModal>
    </div>
  );
};

export default Navbar;
