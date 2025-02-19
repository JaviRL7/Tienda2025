"use client"

import { useForm } from "react-hook-form";

function Registro() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Registro</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
