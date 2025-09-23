import ProductDetail from '@/components/product/product-detail';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    // Si el ID no es válido, redirigir a la tienda
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ID de producto inválido</h1>
          <a href="/tienda" className="text-blue-600 hover:underline">
            Volver a la tienda
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetail productId={productId} />;
}