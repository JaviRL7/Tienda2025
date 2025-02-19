// app/login/page.tsx

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Usar el proveedor de credenciales de NextAuth para autenticar
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      router.push("/"); // Redirigir a la página principal si es exitoso
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
          Iniciar sesión
        </button>

        <div className="mt-4 text-center">
          <p>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-500">Regístrate</a>
          </p>
        </div>
      </form>
    </div>
  );
}
