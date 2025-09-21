import ProductDetail from '@/components/product/product-detail';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetail productId={parseInt(id)} />;
}