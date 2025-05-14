// components/navbar.tsx
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginModal from "./ui/modals/LoginModal";
import RegisterModal from "./ui/modals/RegisterModal";
import UserMenu from "./navbar/Usermenu";
import CartIndicator from "./ui/navbar/CartIndicator";
import CartDrawer from "./ui/navbar/CartDrawer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userData } = useSWR("/api/user/me", fetcher);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="bg-[#E3C8B5] font-[Bodoni Moda] text-2xl text-[#5C4A42] font-bold px-8 relative h-28 flex items-center">
      {/* Contenedor centrado: Logo y enlaces */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-x-10">
        <p
          onClick={() => router.push("/sobre-nosotros")}
          className="cursor-pointer hover:text-white"
        >
          Sobre nosotros
        </p>
        <p
          onClick={() => router.push("/clases")}
          className="cursor-pointer hover:text-white"
        >
          Clases
        </p>
        {/* Logo centrado */}
        <img
          src="/logos/logo2.png"
          alt="Logo"
          className="h-20 cursor-pointer mx-4"
          onClick={() => router.push("/")}
        />
        {/* Links de usuario o login/register */}
        {session?.user && userData ? (
          <UserMenu userName={userData.name || session.user.name || ""} />
        ) : (
          <>
            <p
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer font-bold hover:text-white"
            >
              Iniciar sesión
            </p>
            <p
              onClick={() => setIsRegisterOpen(true)}
              className="cursor-pointer font-bold hover:text-white"
            >
              Registrarse
            </p>
          </>
        )}
      </div>

      {/* Indicador de carrito y drawer */}
      <div className="absolute right-8 flex items-center gap-4">
        <CartIndicator onClick={() => setIsCartOpen(true)} />
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
