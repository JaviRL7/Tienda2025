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

export const getProductos = async () => {
    try {
      const productos = await prisma.productos.findMany({
        include: {
          categoria: true,
          apartados: true,
        },
      });
      return productos;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  };
  
export const getCategorias = async () => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        tipo: true,
        productos: true,
      },
    });
    return categorias;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};
