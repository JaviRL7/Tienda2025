
"use client";  // Agrega esta línea

import { useRouter } from "next/navigation";

interface ProductoProps {
  id: number;
  img: string | null;
  codigo_color: string;
  codigo_tintanda: string;
}

const EstructuraProducto = ({ id, img, codigo_color, codigo_tintanda }: ProductoProps) => {
  const router = useRouter();

  return (
    <div className="p-6 border-b-4 border-[#9B4D67] rounded-lg">
      <img
        src={img || "/default.jpg"}
        alt={codigo_tintanda}
        className="w-full h-64 object-contain rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold">{codigo_tintanda}</h3>
      <p className="text-gray-600">Color: {codigo_color}</p>
      <button
        className="mt-4 bg-[#9B4D67] text-white px-4 py-2 rounded-full"
        onClick={() => router.push(`/tienda/${id}`)}  // Redirige al detalle del producto
      >
        Ver más
      </button>
    </div>
  );
};

export default EstructuraProducto;
