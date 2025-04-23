// lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getTipos = async () => {
  try {
    const tipos = await prisma.tipo.findMany();
    return tipos;
  } catch (error) {
    console.error('Error fetching tipos:', error);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { tipo: true, productos: true },
    });
    return categorias;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};
// lib/db.ts
export const getProductos = async () => {
  const productos = await prisma.productos.findMany({
    include: { categoria: true, apartados: true },
  });
  // Normalizamos en_pantalla a boolean
  return productos.map(p => ({
    ...p,
    en_pantalla: p.en_pantalla ?? false
  }));
};

export async function getProductoById(id: number) {
  const p = await prisma.productos.findUnique({
    where: { id },
    include: { categoria: true },
  });
  if (!p) return null;
  return {
    ...p,
    en_pantalla: p.en_pantalla ?? false
  };
}