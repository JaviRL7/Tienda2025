interface Product { 
  id: number;
  img: string | null;
  codigo_color: string;
  codigo_tintanda: string;
  categoria: {
    nombre: string;
  } | null;
}

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="p-8 mx-32"> {/* Más margen a los lados */}
      
      {/* Título de productos destacados */}
      <h2 className="text-5xl font-bold text-[#9B4D67] mb-8 font-[Bodoni Moda]">
        Nuestros Productos Destacados
      </h2>

      {/* Contenedor de productos en filas de 3 con más espacio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 flex flex-col space-y-4">
            
            {/* Imagen */}
            <div className="flex justify-center items-center h-72">
              <img
                src={product.img || "/path/to/default/image.jpg"}
                alt={product.codigo_tintanda}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>

            {/* Nombre y precio */}
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-[#9B4D67]">
                {product.categoria?.nombre}
              </h3>
              <p className="text-2xl font-bold text-[#9B4D67]">9.99€</p>
            </div>

            {/* Código de tintanda y color */}
            <p className="text-lg text-gray-600 font-medium">Tintanda: {product.codigo_tintanda}</p>
            {product.categoria && (
              <p className="text-lg text-gray-600 font-medium">Color: {product.codigo_color}</p>
            )}

            {/* Borde morado burdeos pastel debajo de cada producto */}
            <div className="border-b-8 border-[#9B4D67] rounded-full mt-4"></div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
