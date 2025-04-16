// app/page.tsx (Sin "use client")
import AboutSection from "@/components/principal/AboutSection";
import Footer from "@/components/principal/footer";
import ClassPromotion from "@/components/principal/ClassPromotion";
import AboutHistory from "@/components/principal/AboutHistory";
import InstagramSection from "@/components/principal/InstagramSection";
import ProductList from "@/components/principal/ProductList";
import VerTiendaButton from "@/components/VerTiendaButton"; // Componente cliente con el onClick

import { Tipo, Producto, Categoria } from "@/app/types/types";
import { getProductos, getTipos, getCategorias } from "@/lib/db";

export default async function Home() {
  // Se obtienen los datos desde el servidor usando Prisma (funciones en lib/db.ts)
  const productos: Producto[] = (await getProductos()).map((producto) => ({
    ...producto,
    en_pantalla: producto.en_pantalla ?? false,
  }));

  const tipos: Tipo[] = await getTipos();
  const categorias: Categoria[] = await getCategorias();

  // Filtramos solo productos que deben mostrarse en la vista rápida
  const productosEnPantalla = productos.filter((p) => p.en_pantalla);

  return (
    <div className="min-h-screen">
      {/* Sección "Sobre Nosotros" */}
      <div className="w-full">
        <AboutSection />
      </div>
      
      {/* Sección de Historia */}
      <div className="w-full">
        <AboutHistory />
      </div>
      
      {/* Sección estática de Tipos */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Tipos:</h3>
        <ul className="list-disc pl-6">
          {tipos.map((tipo) => (
            <li key={tipo.id} className="text-lg">{tipo.nombre}</li>
          ))}
        </ul>
      </div>
      
      {/* Sección estática de Categorías */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Categorías:</h3>
        <ul className="list-disc pl-6">
          {categorias.map((categoria) => (
            <li key={categoria.id} className="text-lg">{categoria.nombre}</li>
          ))}
        </ul>
      </div>
      
      {/* Vista rápida de Productos con filtros y animación */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Nuestros Productos</h3>
        <ProductList
          productos={productosEnPantalla}
          tipos={tipos}
          categorias={categorias}
        />
        <div className="mt-4 text-center">
          <VerTiendaButton />
        </div>
      </div>
      
      {/* Carrusel de Productos */}
      <div className="w-full">
        <ClassPromotion />
      </div>
      
      {/* Sección de Instagram */}
      <div className="w-full">
        <InstagramSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
