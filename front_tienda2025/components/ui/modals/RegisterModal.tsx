"use client"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import RegisterForm from "../forms/RegisterForm";
import SocialButton from "../buttons/SocialButton"; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { X } from "lucide-react";
import { signIn } from "next-auth/react"; // Importamos signIn

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
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
      // Después de registrar al usuario, inicia sesión automáticamente
      const loginRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Evitar redirección automática
      });

      if (loginRes?.ok) {
        // Redirigir a la página principal
        router.push("/");
        onClose(); // Cerrar modal
      } else {
        // Manejar error de login (por ejemplo, usuario o contraseña incorrectos)
        console.error("Error al iniciar sesión");
      }
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <div className="flex w-full">
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-semibold mt-2 text-center">¡Crea tu cuenta!</h2>
          <img
            src="/punto/2.jpg"
            alt="Bienvenido"
            className="w-72 h-72 object-cover rounded-lg mt-6"
          />
          <p className="text-gray-600 mt-6 text-center">
            ¿Ya tienes cuenta?{" "}
            <span
              className="text-blue-600 cursor-pointer block"
              onClick={() => router.push("/auth/login")}
            >
              Inicia sesión aquí
            </span>
          </p>
        </div>

        {/* Sección Derecha */}
        <div className="w-1/2 p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

          {/* Formulario de registro */}
          <RegisterForm onSubmit={onSubmit} />

          {/* Registro con redes sociales */}
          <div className="mt-10 border-t pt-6">
            <p className="text-center text-gray-600 text-sm mb-4">O regístrate con:</p>
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

          <div className="mt-4 text-center">
            <p
              className="text-blue-600 cursor-pointer text-sm"
              onClick={() => router.push("/auth/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
