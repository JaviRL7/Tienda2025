"use client";

import { useState } from "react";
import { ShoppingBasket, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomModal from "./ui/modal"; // Modal reutilizable
import Register from "./registros/register"; // Formulario de registro

const Navbar = () => {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between px-10 py-6 bg-[#E3C8B5] shadow-md font-[Bodoni Moda] text-xl text-[#5C4A42]">
      {/* Logo */}
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <img src="/logos/logo2.png" alt="Logo" className="h-24" />
      </div>

      {/* Menú de navegación */}
      <div className="flex space-x-12">
        <p onClick={() => router.push("/sobre-nosotros")} className="cursor-pointer hover:text-white">Sobre nosotros</p>
        <p onClick={() => router.push("/clases")} className="cursor-pointer hover:text-white">Clases</p>
        <p onClick={() => router.push("/productos")} className="cursor-pointer hover:text-white">Productos</p>
        <p onClick={() => router.push("/accesorios")} className="cursor-pointer hover:text-white">Accesorios</p>
      </div>

      {/* Iconos y botones */}
      <div className="flex items-center space-x-8">
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
