import prisma from "@/lib/prisma";
import ProductList from "@/components/principal/ProductList"; // Importamos el componente ProductList
import { Categoria } from "@/app/types/types"; // Importamos los tipos

const Tienda = async () => {
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#9B4D67] mb-6">Tienda</h1>

      {categorias.length > 0 ? (
        categorias.map((categoria: Categoria) => (
          <div key={categoria.id} className="mb-12">
            <h2 className="text-3xl font-semibold text-[#5C4A42] mb-4">
              {categoria.nombre}
            </h2>

            {/* Usamos ProductList para cada categoría */}
            <ProductList productos={categoria.productos} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay categorías disponibles.</p>
      )}
    </div>
  );
};

export default Tienda;
