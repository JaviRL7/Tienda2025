"use client";

import { useForm } from "react-hook-form";
import Modal from "react-modal";

interface RegistroProps {
  isOpen: boolean;
  onClose: () => void;
}

function Registro({ isOpen, onClose }: RegistroProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        nombre: data.name,
        correo: data.email,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      onClose();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Registro
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nombre</label>
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Correo</label>
            <input
              type="email"
              {...register("email", { required: "El correo es obligatorio" })}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">ContraseAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message as string}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Confirmar contraseña</label>
            <input
              type="password"
              {...register("confirmPassword", { required: "Confirma tu contraseña" })}
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message as string}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          >
            Registrarse
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Registro;
