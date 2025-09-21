import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Producto } from '@/lib/api';

export interface CartItem {
  id: number;
  producto: Producto;
  cantidad: number;
  fechaApartado: Date;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (producto: Producto) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (producto: Producto) => {
        const items = get().items;
        const existingItem = items.find(item => item.producto.id === producto.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.producto.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: Date.now(),
            producto,
            cantidad: 1,
            fechaApartado: new Date(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id: number) => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
      },

      updateQuantity: (id: number, cantidad: number) => {
        if (cantidad <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, cantidad } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.producto.precio * item.cantidad),
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);