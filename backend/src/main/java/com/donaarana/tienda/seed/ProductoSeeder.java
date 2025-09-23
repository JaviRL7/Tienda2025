package com.donaarana.tienda.seed;

import com.donaarana.tienda.entity.Categoria;
import com.donaarana.tienda.entity.Producto;
import com.donaarana.tienda.repository.CategoriaRepository;
import com.donaarana.tienda.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
public class ProductoSeeder implements CommandLineRunner {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo ejecutar si no hay productos
        if (productoRepository.count() == 0) {
            System.out.println("🌱 Ejecutando Seeder de Productos Katia...");
            seedProductos();
            System.out.println("✅ Seeder completado: 15 productos Katia insertados");
        } else {
            System.out.println("⚠️ Productos ya existen, omitiendo seeder");
        }
    }

    private void seedProductos() {
        // Obtener categorías
        Categoria lanaMemrino = getCategoriaByNombre("Lana Merino");
        Categoria lanaGruesa = getCategoriaByNombre("Lana Gruesa");
        Categoria algodon = getCategoriaByNombre("Algodón");
        Categoria acrilico = getCategoriaByNombre("Acrílico");
        Categoria especialidades = getCategoriaByNombre("Especialidades");

        // Productos Katia en orden exacto de tu lista
        crearProducto("Katia Panama", "KT-PANAMA-001",
                     new BigDecimal("8.50"), true, "/productos/p1.jpg", algodon);

        crearProducto("Katia Merino Classic", "KT-MERINO-CL-001",
                     new BigDecimal("12.75"), true, "/productos/p2.jpg", lanaMemrino);

        crearProducto("Katia Merino Ombré", "KT-MERINO-OMBRE-001",
                     new BigDecimal("16.80"), false, "/productos/p3.jpg", lanaMemrino);

        crearProducto("Katia Concept Heli Socks", "KT-HELI-SOCKS-001",
                     new BigDecimal("14.20"), false, "/productos/p4.jpg", lanaMemrino);

        crearProducto("Katia Holi", "KT-HOLI-001",
                     new BigDecimal("11.90"), false, "/productos/p5.jpg", lanaMemrino);

        crearProducto("Katia Paint Lover", "KT-PAINT-LV-001",
                     new BigDecimal("18.90"), true, "/productos/p6.jpg", especialidades);

        crearProducto("Katia Polar Extreme", "KT-POLAR-EXT-001",
                     new BigDecimal("22.50"), false, "/productos/p7.jpg", lanaGruesa);

        crearProducto("Katia Bambini", "KT-BAMBINI-001",
                     new BigDecimal("9.75"), false, "/productos/p8.jpg", lanaMemrino);

        crearProducto("Katia Ingenua", "KT-INGENUA-001",
                     new BigDecimal("17.30"), false, "/productos/p9.jpg", especialidades);

        crearProducto("Katia Mammy", "KT-MAMMY-001",
                     new BigDecimal("19.80"), false, "/productos/p10.jpg", lanaGruesa);

        crearProducto("Katia Merino Baby", "KT-MERINO-BABY-001",
                     new BigDecimal("21.60"), false, "/productos/p11.jpg", lanaMemrino);

        crearProducto("Katia Merino Aran Sunrise", "KT-MERINO-ARS-001",
                     new BigDecimal("15.40"), false, "/productos/p12.jpg", lanaMemrino);

        crearProducto("Katia Merino Aran", "KT-MERINO-AR-001",
                     new BigDecimal("15.25"), true, "/productos/p13.jpg", lanaMemrino);

        crearProducto("Katia Capri", "KT-CAPRI-001",
                     new BigDecimal("8.90"), false, "/productos/p14.jpg", algodon);

        crearProducto("Katia Sherpa", "KT-SHERPA-001",
                     new BigDecimal("24.75"), false, "/productos/p15.jpg", lanaGruesa);
    }

    private void crearProducto(String nombre, String descripcion, BigDecimal precio,
                              boolean destacado, String img, Categoria categoria) {
        Producto producto = new Producto();
        producto.setCodigoColor(nombre);
        producto.setCodigoTintada(descripcion);
        producto.setPrecio(precio);
        producto.setEnPantalla(destacado);
        producto.setImg(img);
        producto.setCategoria(categoria);

        productoRepository.save(producto);
        System.out.println("📦 Producto creado: " + nombre + " - Destacado: " + destacado);
    }

    private Categoria getCategoriaByNombre(String nombre) {
        Optional<Categoria> categoria = categoriaRepository.findByNombre(nombre);
        if (categoria.isPresent()) {
            return categoria.get();
        } else {
            throw new RuntimeException("❌ Categoría no encontrada: " + nombre);
        }
    }
}