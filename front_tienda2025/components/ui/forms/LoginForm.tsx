"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validationSchema";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loginError, setLoginError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setLoginError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("Resultado de signIn:", res);
    if (res?.ok) {
      onClose();
    } else {
      setLoginError("Correo o contraseña incorrectos");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {loginError && (
        <p className="text-red-500 text-xs text-center">{loginError}</p>
      )}
      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Correo Electrónico"
          className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-green-300 text-white font-bold rounded-lg hover:bg-green-400 focus:outline-none"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
