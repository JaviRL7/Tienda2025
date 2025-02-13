"use client";

import { ShoppingCart, Heart, Home } from "lucide-react"; // Importando iconos adicionales
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      {/* Logo con enlace a inicio */}
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Doña Araña
      </h1>

      {/* Menú horizontal con íconos */}
      <div className="hidden sm:flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Home className="text-gray-600 cursor-pointer hover:text-blue-600" onClick={() => router.push("/")} />
          <p className="text-gray-600 cursor-pointer hover:text-blue-600">Inicio</p>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="text-gray-600 cursor-pointer hover:text-red-500" onClick={() => router.push("/favorites")} />
          <p className="text-gray-600 cursor-pointer hover:text-red-500">Favoritos</p>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart strokeWidth={1} className="cursor-pointer text-gray-600 hover:text-blue-600" onClick={() => router.push("/cart")} />
          <p className="text-gray-600 cursor-pointer hover:text-blue-600">Carrito</p>
        </div>
      </div>

      {/* Menú de navegación */}
      <div className="sm:flex hidden">
        <MenuList />
      </div>
    </div>
  );
};

export default Navbar;
