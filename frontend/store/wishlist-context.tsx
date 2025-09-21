'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Producto } from '@/lib/mock-data';

interface WishlistState {
  items: Producto[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Producto }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' };

const initialState: WishlistState = {
  items: [],
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

interface WishlistContextType {
  items: Producto[];
  addToWishlist: (producto: Producto) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (producto: Producto) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (producto: Producto) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: producto });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const toggleWishlist = (producto: Producto) => {
    if (state.items.some(item => item.id === producto.id)) {
      removeFromWishlist(producto.id);
    } else {
      addToWishlist(producto);
    }
  };

  const isInWishlist = (productId: number) => {
    return state.items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const value: WishlistContextType = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    itemCount: state.items.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}