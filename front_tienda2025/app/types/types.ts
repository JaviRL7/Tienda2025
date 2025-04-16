export interface Tipo {
  id: number;
  nombre: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  tipoId: number;
}

export interface Producto {
  id: number;
  codigo_color: string;
  codigo_tintada: string;
  precio: number;
  en_pantalla: boolean;  // Si el valor en la base de datos es siempre verdadero o falso
  img: string | null;
  categoria: Categoria | null;
}
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}
