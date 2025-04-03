import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SocialButton from "./botones/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useForm, FieldError } from "react-hook-form";
import { useRouter } from "next/navigation";

// Interfaces
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

const RegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        nombre: data.firstName,
        correo: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const getErrorMessage = (error: FieldError | undefined): string => {
    return error?.message ?? "Error desconocido";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          {...modalAnimations.overlay}
        >
          <motion.div
            className="bg-white w-[1100px] max-w-full rounded-lg shadow-lg flex overflow-hidden p-10"
            {...modalAnimations.content}
          >
            {/* Sección Izquierda */}
            <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
              <h2 className="text-xl font-semibold mt-2 text-center">
                ¡Forma parte de nuestra familia!
              </h2>
              <img
                src="/punto/2.jpg"
                alt="Bienvenido"
                className="w-72 h-72 object-cover rounded-lg mt-6"
              />
              <p className="text-gray-600 mt-6 text-center">
                ¿Ya tienes cuenta?
                <span
                  className="text-blue-600 cursor-pointer block"
                  onClick={() => router.push("/auth/login")}
                >
                  Inicia sesión
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
              <h2 className="text-2xl font-bold mb-6">Regístrate</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: "El nombre es obligatorio",
                    })}
                    placeholder="Nombre"
                    className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">
                      {getErrorMessage(errors.firstName)}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "El correo es obligatorio",
                    })}
                    placeholder="Correo Electrónico"
                    className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {getErrorMessage(errors.email)}
                    </span>
                  )}
                </div>
                {/* Contraseña y Confirmar Contraseña en la misma fila */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                      })}
                      placeholder="Contraseña"
                      className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs">
                        {getErrorMessage(errors.password)}
                      </span>
                    )}
                  </div>
                  <div className="w-1/2">
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirma la contraseña",
                      })}
                      placeholder="Repetir Contraseña"
                      className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-xs">
                        {getErrorMessage(errors.confirmPassword)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 !mt-16 bg-green-300 text-white font-bold rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Registrarse
                </button>
              </form>
              <div className="mt-8 border-t pt-6">
                <p className="text-center text-gray-600 text-sm mb-4">
                  O regístrate con:
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <SocialButton
                    icon={<FcGoogle className="w-5 h-5" />}
                    onClick={() => console.log("Google")}
                  />
                  <SocialButton
                    icon={<FaFacebook className="w-5 h-5 text-blue-600" />}
                    onClick={() => console.log("Facebook")}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
