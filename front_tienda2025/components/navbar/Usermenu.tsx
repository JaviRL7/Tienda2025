"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  userName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleProfile = () => {
    setIsOpen(false);
    router.push("/perfil");
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  // Definir la animación para el menú
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="relative inline-block">
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer font-bold hover:text-white focus:outline-none"
      >
        Bienvenido, {userName}!
      </button>

      {/* Menú desplegable con Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 origin-top-right"
          >
            <ul className="py-1">
              <li>
                <button
                  onClick={handleProfile}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Perfil
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
