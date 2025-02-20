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
    <div className="flex items-center justify-between px-10 py-4 bg-[#f5e6da] shadow-md font-[Bodoni Moda] text-lg">
      {/* Logo */}
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <img src="/logos/logo2.png" alt="Logo" className="h-20" />
      </div>

      {/* Menú de navegación */}
      <div className="flex space-x-10">
        <p onClick={() => router.push("/sobre-nosotros")} className="cursor-pointer text-gray-700 hover:text-gray-900">Sobre nosotros</p>
        <p onClick={() => router.push("/clases")} className="cursor-pointer text-gray-700 hover:text-gray-900">Clases</p>
        <p onClick={() => router.push("/productos")} className="cursor-pointer text-gray-700 hover:text-gray-900">Productos</p>
        <p onClick={() => router.push("/accesorios")} className="cursor-pointer text-gray-700 hover:text-gray-900">Accesorios</p>
      </div>

      {/* Iconos y botones */}
      <div className="flex items-center space-x-6">
        <Heart className="cursor-pointer text-gray-700 hover:text-red-500" size={24} onClick={() => router.push("/favorites")} />
        <ShoppingBasket className="cursor-pointer text-gray-700 hover:text-gray-900" size={24} onClick={() => router.push("/cart")} />
        
        <p onClick={() => router.push("/auth/login")} className="cursor-pointer font-bold hover:text-gray-900">Iniciar sesión</p>
        <p onClick={() => setIsRegisterOpen(true)} className="cursor-pointer font-bold hover:text-gray-900">Registrarse</p>
      </div>

      {/* Modal de Registro */}
      <CustomModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      </CustomModal>
    </div>
  );
};

export default Navbar;
