"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginModal from "./ui/modals/LoginModal";
import RegisterModal from "./ui/modals/RegisterModal";
import UserMenu from "./navbar/Usermenu";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

        {/* Enlaces a la derecha del logo */}
        {session?.user ? (
          <UserMenu userName={session.user.name ?? ""} />
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

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default Navbar;
