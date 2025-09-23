import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Producto } from '@/lib/api';

interface FavoritesState {
  favorites: Producto[];
  addToFavorites: (producto: Producto) => void;
  removeFromFavorites: (productoId: number) => void;
  isFavorite: (productoId: number) => boolean;
  toggleFavorite: (producto: Producto) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (producto) => {
        const { favorites } = get();
        if (!favorites.find(p => p.id === producto.id)) {
          set({ favorites: [...favorites, producto] });
        }
      },

      removeFromFavorites: (productoId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(p => p.id !== productoId) });
      },

      isFavorite: (productoId) => {
        const { favorites } = get();
        return favorites.some(p => p.id === productoId);
      },

      toggleFavorite: (producto) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        if (isFavorite(producto.id)) {
          removeFromFavorites(producto.id);
        } else {
          addToFavorites(producto);
        }
      }
    }),
    {
      name: 'dona-arana-favorites',
    }
  )
);