import prisma from "@/lib/prisma";
import EstructuraProducto from "@/components/ui/estructuraProducto";

const Tienda = async () => {
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#9B4D67] mb-6">Tienda</h1>

      {categorias.map((categoria) => (
        <div key={categoria.id} className="mb-12">
          <h2 className="text-3xl font-semibold text-[#5C4A42] mb-4">{categoria.nombre}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categoria.productos.length > 0 ? (
              categoria.productos.map((producto) => (
                <EstructuraProducto
                  key={producto.id}
                  id={producto.id}  // Aquí agregamos el ID correctamente
                  img={producto.img}
                  codigo_color={producto.codigo_color}
                  codigo_tintanda={producto.codigo_tintanda}
                />
              ))
            ) : (
              <p className="text-gray-500">No hay productos en esta categoría.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tienda;
