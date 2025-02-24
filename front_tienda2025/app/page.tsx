import AboutSection from "@/components/principal/AboutSection";
import FeaturedProducts from "@/components/principal/FeaturedProducts";
import Footer from "@/components/principal/footer";
import ClassPromotion from "@/components/principal/ClassPromotion";
import AboutHistory from "@/components/principal/AboutHistory";
import InstagramSection from "@/components/principal/InstagramSection";

import prisma from "@/lib/prisma";

// Obtener productos desde la base de datos con la categoría
async function getProducts() {
  return await prisma.productos.findMany({
    select: {
      id: true,
      img: true,
      codigo_color: true,
      codigo_tintanda: true,
      categoria: {
        select: {
          nombre: true,
        },
      },
    },
  });
}

export default async function Home() {
  const productos = await getProducts();

  return (
    <div className="min-h-screen">
      {/* Sección "Sobre Nosotros" */}
      <div className="w-full">
        <AboutSection />
      </div>
      <div className="w-full">
        
      <AboutHistory />
      </div>
      {/* Productos Destacados */}
      <div className="w-full">
        <FeaturedProducts products={productos.slice(0, 5)} />
      </div>

      {/* Carrusel de Productos */}
      <div className="w-full">
        <ClassPromotion/>
      </div>
      <div className="w-full">
        <InstagramSection/>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
