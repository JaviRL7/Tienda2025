// app/api/productos/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const productos = await prisma.productos.findMany({ include: { categoria: true } });
  return NextResponse.json(productos);
}
