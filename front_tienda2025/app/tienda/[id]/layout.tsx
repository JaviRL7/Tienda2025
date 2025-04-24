// app/tienda/[id]/layout.tsx
import type { ReactNode } from "react";

export default function DetalleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* aquí va SOLO el link "← Volver a tienda" y el contenido del detalle */}
      {children}
    </div>
  );
}
