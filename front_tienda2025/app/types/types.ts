// /app/types/types.ts

export interface Tipo {
  id: number;
  nombre: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export interface Producto {
  id: number;
  codigo_color: string;
  codigo_tintada: string;
  precio: number;
  img: string | null;
  categoria: Categoria | null;
}
