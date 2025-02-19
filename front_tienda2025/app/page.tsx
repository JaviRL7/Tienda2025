import prisma from "@/lib/prisma";

export default async function Home() {
  // Obtener productos desde la base de datos
  const productos = await prisma.productos.findMany();

  return (
    <div className="min-h-screen p-8 pb-20">
      <h1 className="text-2xl font-bold">Lista de Productos</h1>
      <ul className="mt-4">
        {productos.map((producto) => (
          <li key={producto.id} className="p-2 border-b">
            {producto.codigo_color} - {producto.codigo_tintanda}
          </li>
        ))}
      </ul>
    </div>
  );
}
