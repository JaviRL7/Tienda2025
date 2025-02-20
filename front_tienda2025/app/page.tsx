import prisma from "@/lib/prisma";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default async function Home() {
  // Obtener productos desde la base de datos
  const productos = await prisma.productos.findMany({
    select: {
      id: true,
      img: true, // Asegúrate de que este campo esté incluido
      codigo_color: true, // Asegúrate de que este campo esté incluido
      codigo_tintanda: true, // Asegúrate de que este campo esté incluido


    },
  });
  console.log(productos);  // Verifica si los datos son correctos

  return (
    <div className="min-h-screen p-8 pb-20">
      <h1 className="text-2xl font-bold">Lista de Productos</h1>

      {/* Carrusel de productos */}
      <div className="mt-8">
        <ProductCarousel products={productos} />
      </div>

      {/* Lista de productos */}
      <ul className="mt-8">
        {productos.map((producto) => (
          <li key={producto.id} className="p-2 border-b">
            {producto.codigo_color} - {producto.codigo_tintanda}
          </li>
        ))}
      </ul>
    </div>
  );
}