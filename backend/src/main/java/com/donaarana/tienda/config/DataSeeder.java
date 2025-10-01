package com.donaarana.tienda.config;

import com.donaarana.tienda.entity.Galeria;
import com.donaarana.tienda.entity.Etiqueta;
import com.donaarana.tienda.repository.GaleriaRepository;
import com.donaarana.tienda.repository.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    @Override
    public void run(String... args) throws Exception {
        seedEtiquetas();
        seedGaleria();
    }

    private void seedEtiquetas() {
        if (etiquetaRepository.count() == 0) {
            List<Etiqueta> etiquetas = Arrays.asList(
                new Etiqueta("manualidades", "Trabajos de manualidades", "#28a745"),
                new Etiqueta("tienda", "Productos de la tienda", "#17a2b8"),
                new Etiqueta("taller", "Imágenes del taller", "#ffc107")
            );
            etiquetaRepository.saveAll(etiquetas);
            System.out.println("✅ Etiquetas insertadas: " + etiquetas.size());
        } else {
            System.out.println("ℹ️ Etiquetas ya existen, saltando seeder");
        }
    }

    private void seedGaleria() {
        if (galeriaRepository.count() == 0) {
            Etiqueta manualidades = etiquetaRepository.findByNombre("manualidades").orElse(null);
            Etiqueta tienda = etiquetaRepository.findByNombre("tienda").orElse(null);
            Etiqueta taller = etiquetaRepository.findByNombre("taller").orElse(null);

            List<Galeria> imagenes = Arrays.asList(
                crearImagen("Galería 1", "g1.webp", manualidades),
                crearImagen("Galería 2", "g2.webp", manualidades),
                crearImagen("Galería 3", "g3.webp", manualidades),
                crearImagen("Galería 4", "g4.webp", manualidades),
                crearImagen("Galería 5", "g5.webp", tienda),
                crearImagen("Galería 6", "g6.webp", tienda),
                crearImagen("Galería 7", "g7.webp", tienda),
                crearImagen("Galería 8", "g8.webp", tienda),
                crearImagen("Galería 9", "g9.webp", taller),
                crearImagen("Galería 10", "g10.webp", taller),
                crearImagen("Galería 11", "g11.webp", taller),
                crearImagen("Galería 12", "g12.webp", taller)
            );

            galeriaRepository.saveAll(imagenes);

            // Actualizar contadores de etiquetas
            if (manualidades != null) {
                manualidades.actualizarContadorUsos();
                etiquetaRepository.save(manualidades);
            }
            if (tienda != null) {
                tienda.actualizarContadorUsos();
                etiquetaRepository.save(tienda);
            }
            if (taller != null) {
                taller.actualizarContadorUsos();
                etiquetaRepository.save(taller);
            }

            System.out.println("✅ Imágenes de galería insertadas: " + imagenes.size());
        } else {
            System.out.println("ℹ️ Galería ya tiene imágenes, saltando seeder");
        }
    }

    private Galeria crearImagen(String nombre, String nombreArchivo, Etiqueta etiqueta) {
        Galeria imagen = new Galeria();
        imagen.setNombre(nombre);
        imagen.setNombreArchivo(nombreArchivo);
        imagen.setRuta("/galeria/" + nombreArchivo);
        imagen.setDescripcion("Imagen de galería");
        imagen.setActiva(true);

        if (etiqueta != null) {
            imagen.agregarEtiqueta(etiqueta);
        }

        return imagen;
    }
}
