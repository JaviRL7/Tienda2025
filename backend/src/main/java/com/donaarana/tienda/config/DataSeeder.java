package com.donaarana.tienda.config;

import com.donaarana.tienda.entity.Galeria;
import com.donaarana.tienda.entity.Etiqueta;
import com.donaarana.tienda.repository.GaleriaRepository;
import com.donaarana.tienda.repository.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    @Override
    @Transactional
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

            // Crear y guardar imágenes SIN etiquetas primero
            List<Galeria> imagenes = Arrays.asList(
                crearImagen("Galería 1", "g1.webp"),
                crearImagen("Galería 2", "g2.webp"),
                crearImagen("Galería 3", "g3.webp"),
                crearImagen("Galería 4", "g4.webp"),
                crearImagen("Galería 5", "g5.webp"),
                crearImagen("Galería 6", "g6.webp"),
                crearImagen("Galería 7", "g7.webp"),
                crearImagen("Galería 8", "g8.webp"),
                crearImagen("Galería 9", "g9.webp"),
                crearImagen("Galería 10", "g10.webp"),
                crearImagen("Galería 11", "g11.webp"),
                crearImagen("Galería 12", "g12.webp")
            );

            List<Galeria> savedImagenes = galeriaRepository.saveAll(imagenes);

            // Asignar etiquetas DESPUÉS de guardar
            if (manualidades != null) {
                for (int i = 0; i < 4 && i < savedImagenes.size(); i++) {
                    savedImagenes.get(i).agregarEtiqueta(manualidades);
                }
            }
            if (tienda != null) {
                for (int i = 4; i < 8 && i < savedImagenes.size(); i++) {
                    savedImagenes.get(i).agregarEtiqueta(tienda);
                }
            }
            if (taller != null) {
                for (int i = 8; i < 12 && i < savedImagenes.size(); i++) {
                    savedImagenes.get(i).agregarEtiqueta(taller);
                }
            }

            // Guardar de nuevo con etiquetas
            galeriaRepository.saveAll(savedImagenes);

            System.out.println("✅ Imágenes de galería insertadas: " + savedImagenes.size());
        } else {
            System.out.println("ℹ️ Galería ya tiene imágenes, saltando seeder");
        }
    }

    private Galeria crearImagen(String nombre, String nombreArchivo) {
        Galeria imagen = new Galeria();
        imagen.setNombre(nombre);
        imagen.setNombreArchivo(nombreArchivo);
        imagen.setRuta("/galeria/" + nombreArchivo);
        imagen.setDescripcion("Imagen de galería");
        imagen.setActiva(true);
        return imagen;
    }
}
