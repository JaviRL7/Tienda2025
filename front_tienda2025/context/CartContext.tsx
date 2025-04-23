// context/CartContext.tsx
"use client";

import { CartProvider as UseCartProvider } from "react-use-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <UseCartProvider>{children}</UseCartProvider>;
}
