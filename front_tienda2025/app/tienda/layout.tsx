// app/tienda/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Tienda" };

export default function TiendaLayout({ children }: { children: ReactNode }) {
  // ¡OJO! Aquí NO metes el Sidebar. Solo envolvemos a los hijos.
  return <>{children}</>;
}
