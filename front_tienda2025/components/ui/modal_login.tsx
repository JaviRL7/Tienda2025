import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SocialButton from "./botones/SocialButton"; // Importa el componente correctamente
import { FcGoogle } from "react-icons/fc";  // Importar el ícono de Google
import { FaFacebook, FaTwitter } from "react-icons/fa";  // Importar los íconos de Facebook y Twitter

// Interfaces
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

// Animaciones
const modalAnimations = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: { scale: 0.85, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      scale: 0.85,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
};

// Componente Principal: CustomModal
const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          {...modalAnimations.overlay}
        >
          <motion.div
            className="bg-white w-[900px] max-w-full rounded-lg shadow-lg flex overflow-hidden"
            {...modalAnimations.content}
          >
            {/* Sección Izquierda */}
            <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
              <img
                src="/punto/2.jpg"
                alt="Welcome"
                className="w-72 h-72 object-cover rounded-lg" // Imagen cuadrada con bordes redondeados
              />
              <h2 className="text-xl font-semibold mt-6">Bienvenido</h2>
              <p className="text-gray-600 mt-2 text-center">
                ¿Aun no eres miembro?{" "}
                <span className="text-blue-600 cursor-pointer">
                  Registrate ahora
                </span>
              </p>
            </div>

            {/* Sección Derecha - Formulario */}
            <div className="w-1/2 p-8 flex flex-col">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-6">Inicia sesión</h2>
              <input
                type="text"
                placeholder="Email"
                className="mt-4 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="mt-4 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center mt-4">
                <input type="checkbox" id="keep-logged" className="mr-2" />
                <label htmlFor="keep-logged" className="text-sm text-gray-600">
                  Mantener la sesión abierta
                </label>
              </div>
              <button className="mt-6 bg-black text-white py-3 rounded-lg text-center hover:bg-gray-800 transition-colors">
                Inicia sesión
              </button>
              <p className="text-sm text-right mt-4 cursor-pointer text-gray-600 hover:underline">
                ¿Has olvidado la contraseña?
              </p>

              {/* Botones de redes sociales */}
              <div className="mt-8 border-t pt-6">
                <p className="text-center text-gray-600 text-sm mb-4">Inicia sesión con: </p>
                <div className="flex justify-center space-x-4">
                  <SocialButton icon={<FcGoogle className="w-5 h-5" />} onClick={() => console.log("Google")} />
                  <SocialButton icon={<FaFacebook className="w-5 h-5 text-blue-600" />} onClick={() => console.log("Facebook")} />
                  <SocialButton icon={<FaTwitter className="w-5 h-5 text-blue-400" />} onClick={() => console.log("Twitter")} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;