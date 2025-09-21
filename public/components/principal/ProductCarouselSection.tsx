import ProductCarousel from "@/components/ui/ProductCarousel";

interface Product {
  id: number;
  img: string | null;
  codigo_color: string;
  codigo_tintanda: string;
}

const ProductCarouselSection = ({ products }: { products: Product[] }) => {
  return (
    <div className="p-6 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Carrusel de Productos</h2>
      <ProductCarousel products={products} />
    </div>
  );
};

export default ProductCarouselSection;
