import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";  // Asegúrate de que la ruta sea correcta
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Product {
  id: number; // Cambiado a number porque en tu esquema el id es Int
  img: string | null; // img puede ser null según tu esquema
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-4">
            {product.img && ( // Verificamos si img no es null
              <img
                src={product.img}
                alt={`Product ${product.id}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button className="text-white">Prev</button>
      </CarouselPrevious>
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button className="text-white">Next</button>
      </CarouselNext>
    </Carousel>
  );
};

// Función para obtener los productos desde la base de datos
export async function getServerSideProps() {
  const products = await prisma.productos.findMany({
    select: {
      id: true,
      codigo_color: true,
      codigo_tintanda: true,
      img: true, // Asegúrate de incluir todos los campos necesarios
    },
  });

  return {
    props: {
      products, // Pasamos los productos con todos los campos como props al componente
    },
  };
}

export default ProductCarousel;