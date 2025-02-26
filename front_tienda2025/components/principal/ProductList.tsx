// /components/principal/ProductList.tsx

import { Producto } from "@/app/types/types";
import ProductCard from "@/components/ui/ProductCard";  // Ruta correcta para ProductCard

interface ProductListProps {
  productos: Producto[];
}

const ProductList: React.FC<ProductListProps> = ({ productos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ProductList;
