import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validationSchema";

interface RegisterFormProps {
  onSubmit: (data: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register("firstName")}
          placeholder="Nombre"
          className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
        />
        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
      </div>

      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Correo Electrónico"
          className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        <div className="w-1/2">
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirmar contraseña"
            className="mt-1 border-b border-gray-300 w-full text-sm p-2 focus:ring-0 focus:outline-none"
          />
          {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-green-300 text-white font-bold rounded-lg hover:bg-green-400 focus:outline-none"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
