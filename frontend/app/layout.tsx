import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/store/cart-context";
import { WishlistProvider } from "@/store/wishlist-context";

export const metadata: Metadata = {
  title: "Doña Araña - Tienda Online",
  description: "Tienda online de lanas, hilos y accesorios para manualidades en Sanlúcar de Barrameda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <WishlistProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}