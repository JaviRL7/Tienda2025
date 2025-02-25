// app/tienda/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";

const ProductoDetalle = ({ params }: { params: { id: string } }) => {
  const [producto, setProducto] = useState<any>(null);
  const router = useRouter();
  const productoId = parseInt(params.id);

  useEffect(() => {
    const obtenerProducto = async () => {
      const res = await prisma.productos.findUnique({
        where: {
          id: productoId,
        },
        include: {
          categoria: true, // Si deseas mostrar la categoría
        },
      });

      setProducto(res);
    };

    obtenerProducto();
  }, [productoId]);

  if (!producto) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-red-500">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#9B4D67] mb-6">Detalle del Producto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src={producto.img || "/default.jpg"}
            alt={producto.codigo_tintanda}
            className="w-full h-96 object-contain rounded-lg mb-4"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">{producto.codigo_tintanda}</h2>
          <p className="text-gray-600">Color: {producto.codigo_color}</p>
          <p className="text-gray-500 mt-4">
            Categoría: {producto.categoria?.nombre || "No disponible"}
          </p>
          {/* Puedes agregar más detalles del producto aquí */}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
