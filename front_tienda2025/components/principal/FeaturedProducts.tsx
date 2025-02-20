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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
            <div className="flex justify-center items-center h-64">
              <img
                src={product.img || "/path/to/default/image.jpg"}
                alt={product.codigo_tintanda}
                className="h-full w-auto object-contain rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">{product.categoria?.nombre}</h3>
              <p className="text-xl font-bold text-green-600">9.99€</p>
            </div>
            <p className="text-gray-600">Tintanda: {product.codigo_tintanda}</p>
            {product.categoria && (
              <p className="text-gray-600">Color: {product.codigo_color}</p>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  
  export default FeaturedProducts;
  