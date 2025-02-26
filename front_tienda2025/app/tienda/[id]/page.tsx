"use client";

import { useEffect, useState } from "react";
import { Producto } from "@/app/types/types"; // Importamos los tipos Producto
import ProductCard from "@/components/ui/ProductCard"; // Importamos el componente ProductCard
import { getProductos } from "@/lib/db"; // Importamos la función getProductos

export default function Tienda() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Para mostrar carga mientras obtenemos los productos

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosData: Producto[] = await getProductos();
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-500 mb-4">No hay productos disponibles</p>
          <p className="text-lg text-gray-400">Actualmente no tenemos productos en stock. ¡Vuelve pronto!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#9B4D67] mb-8">Todos losAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Productos</h1>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}
