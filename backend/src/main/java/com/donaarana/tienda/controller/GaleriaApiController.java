package com.donaarana.tienda.controller;

import com.donaarana.tienda.entity.Galeria;
import com.donaarana.tienda.entity.Etiqueta;
import com.donaarana.tienda.repository.GaleriaRepository;
import com.donaarana.tienda.repository.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/management/galeria")
@CrossOrigin(origins = "*")
public class GaleriaApiController {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    private final String uploadDir = "src/main/resources/static/galeria/";

    @GetMapping("/etiquetas")
    public ResponseEntity<List<Etiqueta>> obtenerEtiquetas() {
        List<Etiqueta> etiquetas = etiquetaRepository.findByActivaTrueOrderByTotalUsosDescNombreAsc();
        return ResponseEntity.ok(etiquetas);
    }

    @GetMapping
    public ResponseEntity<List<Galeria>> obtenerGaleria() {
        List<Galeria> fotos = galeriaRepository.findByActivaTrueOrderByFechaSubidaDesc();
        return ResponseEntity.ok(fotos);
    }

    @GetMapping("/etiqueta/{etiqueta}")
    public ResponseEntity<List<Galeria>> obtenerPorEtiqueta(@PathVariable String etiqueta) {
        List<Galeria> fotos = galeriaRepository.findByEtiquetaNombre(etiqueta);
        return ResponseEntity.ok(fotos);
    }

    @PostMapping("/upload")
    public ResponseEntity<Galeria> subirFoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("descripcion") String descripcion,
            @RequestParam(value = "etiquetas", required = false) String etiquetas) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String extension = getFileExtension(file.getOriginalFilename());
        String nombreArchivo = UUID.randomUUID().toString() + "." + extension;

        // Guardar archivo
        Path filePath = uploadPath.resolve(nombreArchivo);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Crear entidad Galeria
        Galeria foto = new Galeria();
        foto.setNombre(file.getOriginalFilename());
        foto.setNombreArchivo(nombreArchivo);
        foto.setRuta("/galeria/" + nombreArchivo);
        foto.setDescripcion(descripcion);
        foto.setTamañoBytes((int) file.getSize());
        foto.setTipoMime(file.getContentType());

        // Obtener dimensiones de la imagen
        try {
            BufferedImage image = ImageIO.read(filePath.toFile());
            if (image != null) {
                foto.setAnchoPx(image.getWidth());
                foto.setAltoPx(image.getHeight());
            }
        } catch (IOException e) {
            // Si no se puede leer como imagen, continuamos sin dimensiones
        }

        // Agregar etiquetas si se proporcionaron
        if (etiquetas != null && !etiquetas.trim().isEmpty()) {
            String[] etiquetasArray = etiquetas.split(",");
            for (String nombreEtiqueta : etiquetasArray) {
                String nombre = nombreEtiqueta.trim().toLowerCase();
                if (!nombre.isEmpty()) {
                    Etiqueta etiqueta = etiquetaRepository.findByNombre(nombre)
                            .orElseGet(() -> {
                                Etiqueta nueva = new Etiqueta(nombre);
                                return etiquetaRepository.save(nueva);
                            });
                    foto.agregarEtiqueta(etiqueta);
                }
            }
        }

        Galeria fotoGuardada = galeriaRepository.save(foto);
        return ResponseEntity.ok(fotoGuardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Galeria> actualizarFoto(@PathVariable Integer id, @RequestBody Galeria fotoActualizada) {
        return galeriaRepository.findById(id)
                .map(foto -> {
                    foto.setDescripcion(fotoActualizada.getDescripcion());
                    foto.setNombre(fotoActualizada.getNombre());
                    return ResponseEntity.ok(galeriaRepository.save(foto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/etiquetas")
    public ResponseEntity<Galeria> actualizarEtiquetas(@PathVariable Integer id, @RequestBody List<String> nombresEtiquetas) {
        return galeriaRepository.findById(id)
                .map(foto -> {
                    // Limpiar etiquetas existentes
                    foto.limpiarEtiquetas();

                    // Agregar nuevas etiquetas
                    for (String nombreEtiqueta : nombresEtiquetas) {
                        String nombre = nombreEtiqueta.trim().toLowerCase();
                        if (!nombre.isEmpty()) {
                            Etiqueta etiqueta = etiquetaRepository.findByNombre(nombre)
                                    .orElseGet(() -> {
                                        Etiqueta nueva = new Etiqueta(nombre);
                                        return etiquetaRepository.save(nueva);
                                    });
                            foto.agregarEtiqueta(etiqueta);
                        }
                    }

                    return ResponseEntity.ok(galeriaRepository.save(foto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFoto(@PathVariable Integer id) {
        return galeriaRepository.findById(id)
                .map(foto -> {
                    // Eliminar archivo físico
                    try {
                        Path filePath = Paths.get("src/main/resources/static" + foto.getRuta());
                        Files.deleteIfExists(filePath);
                    } catch (IOException e) {
                        // Log error pero no fallar la eliminación de la BD
                        System.err.println("Error eliminando archivo: " + e.getMessage());
                    }

                    // Limpiar relaciones
                    foto.limpiarEtiquetas();
                    galeriaRepository.save(foto); // Para actualizar contadores
                    galeriaRepository.delete(foto);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "jpg";
        }
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }
}