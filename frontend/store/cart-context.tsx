'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Producto, ProductoColor } from '@/lib/mock-data';

export interface CartItem {
  id: string;
  producto: Producto;
  color: ProductoColor;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { producto: Producto; color: ProductoColor } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; cantidad: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { producto, color } = action.payload;
      const itemId = `${producto.id}-${color.id}`;

      const existingItem = state.items.find(item => item.id === itemId);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === itemId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: itemId,
            producto,
            color,
            cantidad: 1,
          },
        ];
      }

      const total = newItems.reduce((sum, item) => sum + (item.color.precioBase * item.cantidad), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.cantidad, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.color.precioBase * item.cantidad), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.cantidad, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, cantidad } = action.payload;

      if (cantidad <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, cantidad } : item
      );

      const total = newItems.reduce((sum, item) => sum + (item.color.precioBase * item.cantidad), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.cantidad, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (producto: Producto, color: ProductoColor) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (producto: Producto, color: ProductoColor) => {
    dispatch({ type: 'ADD_ITEM', payload: { producto, color } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, cantidad: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, cantidad } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}