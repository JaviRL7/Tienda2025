// /components/principal/ProductCard.tsx

import { Producto } from "@/app/types/types";

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
      <img
        src={producto.img || "/default-image.jpg"}  // Muestra una imagen por defecto si no existe
        alt={producto.codigo_tintada}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold">{producto.codigo_tintada}</h3>
      <p className="text-gray-600">{producto.categoria?.nombre}</p>
      <p className="text-lg font-bold">${producto.precio.toFixed(2)}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
