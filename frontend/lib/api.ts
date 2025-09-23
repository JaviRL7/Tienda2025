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
  const token = Cookies.get('token');
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
      api.post<Producto>('/admin/productos', data),

    actualizar: (id: number, data: Partial<Producto>) =>
      api.put<Producto>(`/admin/productos/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/admin/productos/${id}`),
  },

  // Users management
  usuarios: {
    getAll: () =>
      api.get<Usuario[]>('/admin/usuarios'),

    actualizar: (id: number, data: Partial<Usuario>) =>
      api.put<Usuario>(`/admin/usuarios/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/admin/usuarios/${id}`),
  },

  // Categories management
  categorias: {
    getAll: () =>
      api.get<Categoria[]>('/admin/categorias'),

    crear: (data: Partial<Categoria>) =>
      api.post<Categoria>('/admin/categorias', data),

    actualizar: (id: number, data: Partial<Categoria>) =>
      api.put<Categoria>(`/admin/categorias/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/admin/categorias/${id}`),
  },

  // Gallery tags management
  galeriaTags: {
    getAll: () =>
      api.get<GaleriaTag[]>('/admin/galeria/tags'),

    crear: (data: Partial<GaleriaTag>) =>
      api.post<GaleriaTag>('/admin/galeria/tags', data),

    actualizar: (id: number, data: Partial<GaleriaTag>) =>
      api.put<GaleriaTag>(`/admin/galeria/tags/${id}`, data),

    eliminar: (id: number) =>
      api.delete(`/admin/galeria/tags/${id}`),
  },
};