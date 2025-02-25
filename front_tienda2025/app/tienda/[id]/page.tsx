"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductoDetalle() {
  const params = useParams();
  const productoId = parseInt(params.id as string);
  const [producto, setProducto] = useState<any>(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`/api/producto/${productoId}`);
        if (!res.ok) throw new Error("Error al obtener el producto");

        const data = await res.json();
        console.log("Producto recibido:", data); // 👀 Verifica los datos recibidos
        setProducto(data);
      } catch (error) {
        console.error("Error cargando el producto:", error);
      }
    };

    if (productoId) obtenerProducto();
  }, [productoId]);

  if (!producto) {
    return <p className="text-red-500 text-center mt-10">Producto no encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#9B4D67] mb-6">Detalle del Producto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Verificamos si la imagen es válida */}
        {producto.img ? (
          <img
            src={`/${producto.img}`} // ✅ Asegura que la ruta sea accesible
            alt={producto.codigo_tintanda}
            className="w-full h-96 object-contain rounded-lg mb-4"
          />
        ) : (
          <p className="text-gray-500">Imagen no disponible</p>
        )}

        <div>
          <h2 className="text-3xl font-semibold">{producto.codigo_tintanda}</h2>
          <p className="text-gray-600">Color: {producto.codigo_color}</p>
          <p className="text-gray-500 mt-4">
            Categoría: {producto.categoria?.nombre || "No disponible"}
          </p>
        </div>
      </div>
    </div>
  );
}
