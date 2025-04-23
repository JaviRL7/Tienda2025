// app/tienda/page.tsx
import TiendaClient from "@/components/tienda/TiendaClient";
import { getProductos, getTipos, getCategorias } from "@/lib/db";
import type { Producto, Tipo, Categoria } from "@/app/types/types";

export default async function TiendaPage() {
  const productosRaw = await getProductos();
  const tipos = await getTipos();
  const categorias = await getCategorias();

  // Normaliza tu campo en_pantalla si hace falta:
  const productos: Producto[] = productosRaw.map((p) => ({
    ...p,
    en_pantalla: p.en_pantalla ?? false,
  }));

  return (
    <TiendaClient
      productos={productos}
      tipos={tipos}
      categorias={categorias}
    />
  );
}
