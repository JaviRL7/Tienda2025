import AboutSection from "@/components/principal/AboutSection"; 
import Footer from "@/components/principal/footer";
import ClassPromotion from "@/components/principal/ClassPromotion";
import AboutHistory from "@/components/principal/AboutHistory";
import InstagramSection from "@/components/principal/InstagramSection";
import ProductList from "@/components/principal/ProductList";  // Importamos el componente ProductList
import { Tipo, Producto, Categoria } from "@/app/types/types"; // Importamos los tipos desde el archivo types.ts
import { getProductos, getTipos, getCategorias } from "@/lib/db"; // Importamos las funciones getProductos, getTipos y getCategorias

export default async function Home() {
  // Tipamos las respuestas de las funciones de la base de datos
  const productos: Producto[] = await getProductos();
  const tipos: Tipo[] = await getTipos();  // Llamada a la función getTipos
  const categorias: Categoria[] = await getCategorias();  // Llamada a la función getCategorias

  return (
    <div className="min-h-screen">
      {/* Sección "Sobre Nosotros" */}
      <div className="w-full">
        <AboutSection />
      </div>
      <div className="w-full">
        <AboutHistory />
      </div>

      {/* Mostrar Tipos */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Tipos:</h3>
        <ul>
          {tipos.map((tipo) => (
            <li key={tipo.id} className="text-lg">{tipo.nombre}</li>
          ))}
        </ul>
      </div>

      {/* Mostrar Categorías */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Categorías:</h3>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id} className="text-lg">{categoria.nombre}</li>
          ))}
        </ul>
      </div>

      {/* Mostrar Productos */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-bold mb-4">Productos:</h3>
        <ProductList productos={productos} />  {/* Llamamos al componente ProductList */}
      </div>

      {/* Carrusel de Productos */}
      <div className="w-full">
        <ClassPromotion />
      </div>
      <div className="w-full">
        <InstagramSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
