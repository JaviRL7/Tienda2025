// app/tienda/[id]/page.tsx
import { getProductoById } from "@/lib/db";
import AddToCartButton from "@/components/ui/buttons/AddToCartButton";
import type { Metadata } from "next";

// metadata:
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;                  // ← espera aquí
  const prod = await getProductoById(Number(id));
  return { title: prod?.categoria?.nombre ?? "Detalle" };
}

export default async function ProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;                  // ← y aquí
  const producto = await getProductoById(Number(id));
  if (!producto) return <p>Producto no encontrado</p>;

  const src = producto.img?.startsWith("/") ? producto.img : `/${producto.img}`;

  return (
    <>
      <a href="/tienda" className="text-blue-600 hover:underline">&larr; Volver a tienda</a>
      <h1 className="text-3xl font-bold">{producto.categoria?.nombre}</h1>
      <img src={src} alt={producto.categoria?.nombre} className="w-full rounded" />
      <p className="text-xl">Precio: {producto.precio.toFixed(2)} €</p>
      <AddToCartButton producto={producto} />
    </>
  );
}
