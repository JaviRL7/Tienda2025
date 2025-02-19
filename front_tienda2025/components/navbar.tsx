"use client";

import { ShoppingBasket, Heart } from "lucide-react"; // Importamos los iconos necesarios
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-6 bg-[#F5F5DC] shadow-md navbar-container">
      {/* Logo con imagen */}
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <img src="/logos/logo2.png" alt="Logo" className="h-24" /> {/* Logo más grande */}
      </div>

      {/* Menú central con la fuente Bodoni Moda solo para el navbar */}
      <div className="flex space-x-8 navbar-font text-xl"> {/* Aplicamos la clase personalizada */}
        <p
          onClick={() => router.push("/sobre-nosotros")}
          className="text-gray-600 cursor-pointer hover:text-blue-600"
        >
          Sobre nosotros
        </p>
        <p
          onClick={() => router.push("/clases")}
          className="text-gray-600 cursor-pointer hover:text-blue-600"
        >
          Clases
        </p>
        <p
          onClick={() => router.push("/productos")}
          className="text-gray-600 cursor-pointer hover:text-blue-600"
        >
          Productos
        </p>
        <p
          onClick={() => router.push("/accesorios")}
          className="text-gray-600 cursor-pointer hover:text-blue-600"
        >
          Accesorios
        </p>
      </div>

      {/* Iconos de carrito y favoritos, y enlaces de login y register */}
      <div className="flex items-center space-x-6">
        {/* Icono de favoritos */}
        <Heart
          className="text-gray-600 cursor-pointer hover:text-red-500"
          size={20}
          onClick={() => router.push("/favorites")}
        />
        
        {/* Icono de carrito */}
        <ShoppingBasket
          className="text-gray-600 cursor-pointer hover:text-blue-600"
          size={20}
          onClick={() => router.push("/cart")}
        />
        
        {/* Enlaces de login y register */}
        <div className="flex space-x-4 navbar-links">
          <p
            onClick={() => router.push("/auth/login")}
            className="text-gray-600 cursor-pointer hover:text-blue-600"
          >
            Iniciar sesión
          </p>
          <p
            onClick={() => router.push("/auth/register")}
            className="text-gray-600 cursor-pointer hover:text-blue-600"
          >
            Registrarse
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
