// app/tienda/[id]/page.tsx
import { getProductoById } from "@/lib/db";
import AddToCartButton from "@/components/ui/buttons/AddToCartButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const prod = await getProductoById(Number(params.id));
  return { title: prod?.categoria?.nombre ?? "Detalle" };
}

export default async function ProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const producto = await getProductoById(Number(params.id));

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{producto.categoria?.nombre}</h1>
      <img
        src={producto.img ?? ""}
        alt={producto.categoria?.nombre ?? ""}
        className="w-full rounded"
      />
      <p className="text-xl">Precio: {producto.precio} €</p>

      {/* Ahora le pasamos la prop producto, no item */}
      <AddToCartButton producto={producto} />
    </div>
  );
}
