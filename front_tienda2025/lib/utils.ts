import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Producto } from "@/app/types/types";
import { Usuario } from "@/app/types/types";
import { Tipo } from "@/app/types/types";
import { Categoria } from "@/app/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function productosEnPantalla(productos: Producto[]): Producto[]{
  return productos.filter(producto =>producto.en_pantalla)
}

export function productosTodos(productos: Producto[]): Producto[]{
  return productos

}
export function productosHilo(productos: Producto[], tipos: Tipo[]): Producto[] {
  const tipoHilo = tipos.find((tipo) => tipo.nombre.toLowerCase() === "hilo");
  if (!tipoHilo) {
    return [];
  }
  return productos.filter(
    (producto) =>
      producto.en_pantalla &&
      producto.categoria !== null &&
      producto.categoria.tipoId === tipoHilo.id
  );
}
export function obtenerTipos(tipos: Tipo[]): Tipo[] {
  return tipos;
}

export function CategoriasPorTipo(categorias: Categoria[], tipoId:number): Categoria[]{
  return categorias.filter(categoria => categoria.tipoId === tipoId);
}
