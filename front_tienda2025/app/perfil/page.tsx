"use client";


import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";


const fetcher = (url: string) => fetch(url).then(res => res.json());


export default function ProfilePage() {
  const router = useRouter();
  const { data: userData, error, mutate } = useSWR("/api/user/me", fetcher);


  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
 
  useEffect(() => {
    if (userData) {
      setFormValues({
        name: userData.name,
        email: userData.email,
      });
    }
  }, [userData]);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });
   
    if (res.ok) {
      console.log("Perfil actualizado correctamente");
      // Forzamos la revalidación de los datos con SWR
      mutate();
    } else {
      console.error("Error al actualizar el perfil");
    }
  };


  if (!userData) return <div>Cargando...</div>;


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de usuario</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
