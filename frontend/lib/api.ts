import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  let token = Cookies.get('token');

  if (!token && typeof window !== 'undefined') {
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        token = parsed.state?.token;
      } catch (e) {
        console.error('Error parsing auth storage:', e);
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol?: string; // admin, user
}

export interface Producto {
  id: number;
  codigoColor: string;
  codigoTintada: string;
  precio: number;
  enPantalla: boolean;
  img?: string;
  categoria?: Categoria;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  tipo?: Tipo;
}

export interface Tipo {
  id: number;
  nombre: string;
}

export interface GaleriaTag {
  id: number;
  nombre: string;
  descripcion?: string;
  color?: string;
  activa?: boolean;
  totalUsos?: number;
  nombreCapitalizado?: string;
}

export interface GaleriaImagen {
  id: number;
  nombre: string;
  nombreArchivo: string;
  ruta: string;
  descripcion?: string;
  tamañoBytes?: number;
  tipoMime?: string;
  anchoPx?: number;
  altoPx?: number;
  fechaSubida: string;
  activa: boolean;
  etiquetas: GaleriaTag[];
  tamañoHumano?: string;
  dimensiones?: string;
}

export interface Apartado {
  id: number;
  usuario: Usuario;
  producto: Producto;
  fechaApartado: string;
  fechaExpiracion: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/signin', data),

  register: (data: RegisterRequest) =>
    api.post('/auth/register', data),
};

export const productosApi = {
  getAll: () =>
    api.get<Producto[]>('/productos'),

  getById: (id: number) =>
    api.get<Producto>(`/productos/${id}`),

  getEnPantalla: () =>
    api.get<Producto[]>('/productos/pantalla'),

  getByCategoria: (categoriaId: number) =>
    api.get<Producto[]>(`/productos/categoria/${categoriaId}`),

  buscar: (codigo: string) =>
    api.get<Producto[]>(`/productos/buscar?codigo=${codigo}`),
};

export const apartadosApi = {
  getMisApartados: () =>
    api.get<Apartado[]>('/apartados/mis-apartados'),

  crear: (productoId: number) =>
    api.post<Apartado>(`/apartados/crear?productoId=${productoId}`),

  eliminar: (id: number) =>
    api.delete(`/apartados/${id}`),

  verificar: (productoId: number) =>
    api.get<{existe: boolean}>(`/apartados/verificar/${productoId}`),

  getCount: (productoId: number) =>
    api.get<{count: number}>(`/apartados/producto/${productoId}/count`),
};

export const usuariosApi = {
  getMe: () =>
    api.get<Usuario>('/usuarios/me'),

  updateMe: (data: Partial<Usuario>) =>
    api.put<Usuario>('/usuarios/me', data),
};

// Admin APIs
export const adminApi = {
  // Products CRUD
  productos: {
    crear: (data: Partial<Producto>) =>
      api.post<Producto>('/management/productos', data),

    actualizar: (id: number, data: Partial<Producto>) =>
      api.put<Producto>(`/management/productos/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/management/productos/${id}`),
  },

  // Users management
  usuarios: {
    getAll: () =>
      api.get<Usuario[]>('/management/usuarios'),

    actualizar: (id: number, data: Partial<Usuario>) =>
      api.put<Usuario>(`/management/usuarios/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/management/usuarios/${id}`),
  },

  // Categories management
  categorias: {
    getAll: () =>
      api.get<Categoria[]>('/management/categorias'),

    crear: (data: Partial<Categoria>) =>
      api.post<Categoria>('/management/categorias', data),

    actualizar: (id: number, data: Partial<Categoria>) =>
      api.put<Categoria>(`/management/categorias/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/management/categorias/${id}`),
  },

  // Gallery tags management
  galeriaTags: {
    getAll: () =>
      api.get<GaleriaTag[]>('/management/galeria/etiquetas'),

    crear: (data: Partial<GaleriaTag>) =>
      api.post<GaleriaTag>('/management/galeria/tags', data),

    actualizar: (id: number, data: Partial<GaleriaTag>) =>
      api.put<GaleriaTag>(`/management/galeria/tags/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/management/galeria/tags/${id}`),
  },
};

export const galeriaApi = {
  getAll: () =>
    api.get<GaleriaImagen[]>('/management/galeria'),

  getEtiquetas: () =>
    api.get<GaleriaTag[]>('/management/galeria/etiquetas'),

  getByEtiqueta: (etiqueta: string) =>
    api.get<GaleriaImagen[]>(`/management/galeria/etiqueta/${etiqueta}`),

  upload: (formData: FormData) =>
    api.post<GaleriaImagen>('/management/galeria/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  actualizar: (id: number, data: Partial<GaleriaImagen>) =>
    api.put<GaleriaImagen>(`/management/galeria/${id}`, data),

  actualizarEtiquetas: (id: number, etiquetas: string[]) =>
    api.put<GaleriaImagen>(`/management/galeria/${id}/etiquetas`, etiquetas),

  eliminar: (id: number) =>
    api.delete(`/management/galeria/${id}`),
};

export interface Resena {
  id: number;
  rating: number;
  comentario: string;
  nombre: string;
  fechaCreacion: string;
  iniciales: string;
}

export interface ResenaRequest {
  rating: number;
  comentario: string;
}

export interface ResenasResponse {
  resenas: Resena[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  averageRating: number;
  totalResenas: number;
}

export const resenasApi = {
  getAll: (page: number = 0, size: number = 10) =>
    api.get<ResenasResponse>(`/resenas?page=${page}&size=${size}`),

  crear: (data: ResenaRequest) =>
    api.post<{ message: string; resena: Resena }>('/resenas', data),

  getMisResenas: () =>
    api.get<{ resenas: Resena[] }>('/resenas/mis-resenas'),
};