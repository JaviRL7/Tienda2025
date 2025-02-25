// app/api/productos/[id]/route.ts

import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const producto = await prisma.productos.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!producto) {
    return new Response('Producto no encontrado', { status: 404 });
  }

  return new Response(JSON.stringify(producto), {
    headers: { 'Content-Type': 'application/json' },
  });
}
