package com.donaarana.tienda.controller;

import com.donaarana.tienda.entity.Galeria;
import com.donaarana.tienda.entity.Etiqueta;
import com.donaarana.tienda.repository.GaleriaRepository;
import com.donaarana.tienda.repository.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Controller
@RequestMapping("/admin/galeria")
public class GaleriaAdminController {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    private final String uploadDir = "src/main/resources/static/galeria/";

    @GetMapping
    public String listar(@RequestParam(required = false) String etiqueta,
                        @RequestParam(required = false) String buscar,
                        Model model) {

        List<Galeria> fotos;

        if (etiqueta != null && !etiqueta.isEmpty()) {
            fotos = galeriaRepository.findByEtiquetaNombre(etiqueta);
            model.addAttribute("filtroActivo", etiqueta);
        } else if (buscar != null && !buscar.isEmpty()) {
            fotos = galeriaRepository.findByTexto(buscar);
            model.addAttribute("busquedaActiva", buscar);
        } else {
            fotos = galeriaRepository.findByActivaTrueOrderByFechaSubidaDesc();
        }

        model.addAttribute("fotos", fotos);
        model.addAttribute("etiquetas", etiquetaRepository.findByActivaTrueOrderByTotalUsosDescNombreAsc());
        model.addAttribute("totalFotos", fotos.size());

        return "admin/galeria/lista";
    }

    @GetMapping("/nueva")
    public String nueva(Model model) {
        model.addAttribute("foto", new Galeria());
        model.addAttribute("etiquetas", etiquetaRepository.findByActivaTrueOrderByNombreAsc());
        return "admin/galeria/form";
    }

    @PostMapping("/guardar")
    public String guardar(@ModelAttribute Galeria foto,
                         @RequestParam("archivo") MultipartFile archivo,
                         @RequestParam(value = "etiquetas", required = false) List<Integer> etiquetasIds,
                         @RequestParam(value = "nuevasEtiquetas", required = false) String nuevasEtiquetas) throws IOException {

        if (archivo.isEmpty()) {
            return "redirect:/admin/galeria?error=archivo_requerido";
        }

        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String extension = getFileExtension(archivo.getOriginalFilename());
        String nombreArchivo = UUID.randomUUID().toString() + "." + extension;

        // Guardar archivo
        Path filePath = uploadPath.resolve(nombreArchivo);
        Files.copy(archivo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

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

        // Configurar entidad
        foto.setNombre(archivo.getOriginalFilename());
        foto.setNombreArchivo(nombreArchivo);
        foto.setRuta("/galeria/" + nombreArchivo);
        foto.setTamañoBytes((int) archivo.getSize());
        foto.setTipoMime(archivo.getContentType());

        // Procesar etiquetas existentes
        if (etiquetasIds != null && !etiquetasIds.isEmpty()) {
            List<Etiqueta> etiquetas = etiquetaRepository.findAllById(etiquetasIds);
            for (Etiqueta etiqueta : etiquetas) {
                foto.agregarEtiqueta(etiqueta);
            }
        }

        // Procesar nuevas etiquetas
        if (nuevasEtiquetas != null && !nuevasEtiquetas.trim().isEmpty()) {
            String[] etiquetasArray = nuevasEtiquetas.split(",");
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

        galeriaRepository.save(foto);
        return "redirect:/admin/galeria";
    }

    @GetMapping("/editar/{id}")
    public String editar(@PathVariable Integer id, Model model) {
        Galeria foto = galeriaRepository.findById(id).orElseThrow();
        model.addAttribute("foto", foto);
        model.addAttribute("etiquetas", etiquetaRepository.findByActivaTrueOrderByNombreAsc());
        model.addAttribute("etiquetasSeleccionadas", foto.getEtiquetas());
        return "admin/galeria/form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                           @ModelAttribute Galeria fotoActualizada,
                           @RequestParam(value = "etiquetas", required = false) List<Integer> etiquetasIds,
                           @RequestParam(value = "nuevasEtiquetas", required = false) String nuevasEtiquetas) {

        Galeria fotoExistente = galeriaRepository.findById(id).orElseThrow();

        // Actualizar campos básicos
        fotoExistente.setDescripcion(fotoActualizada.getDescripcion());
        fotoExistente.setNombre(fotoActualizada.getNombre());

        // Limpiar etiquetas existentes
        fotoExistente.limpiarEtiquetas();

        // Procesar etiquetas seleccionadas
        if (etiquetasIds != null && !etiquetasIds.isEmpty()) {
            List<Etiqueta> etiquetas = etiquetaRepository.findAllById(etiquetasIds);
            for (Etiqueta etiqueta : etiquetas) {
                fotoExistente.agregarEtiqueta(etiqueta);
            }
        }

        // Procesar nuevas etiquetas
        if (nuevasEtiquetas != null && !nuevasEtiquetas.trim().isEmpty()) {
            String[] etiquetasArray = nuevasEtiquetas.split(",");
            for (String nombreEtiqueta : etiquetasArray) {
                String nombre = nombreEtiqueta.trim().toLowerCase();
                if (!nombre.isEmpty()) {
                    Etiqueta etiqueta = etiquetaRepository.findByNombre(nombre)
                            .orElseGet(() -> {
                                Etiqueta nueva = new Etiqueta(nombre);
                                return etiquetaRepository.save(nueva);
                            });
                    fotoExistente.agregarEtiqueta(etiqueta);
                }
            }
        }

        galeriaRepository.save(fotoExistente);
        return "redirect:/admin/galeria";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        galeriaRepository.findById(id).ifPresent(foto -> {
            // Eliminar archivo físico
            try {
                Path filePath = Paths.get("src/main/resources/static" + foto.getRuta());
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Error eliminando archivo: " + e.getMessage());
            }

            // Limpiar relaciones antes de eliminar
            foto.limpiarEtiquetas();
            galeriaRepository.save(foto); // Para actualizar contadores
            galeriaRepository.delete(foto);
        });
        return "redirect:/admin/galeria";
    }

    // Gestión de etiquetas
    @GetMapping("/etiquetas")
    public String gestionarEtiquetas(Model model) {
        model.addAttribute("etiquetas", etiquetaRepository.findByActivaTrueOrderByTotalUsosDescNombreAsc());
        model.addAttribute("nuevaEtiqueta", new Etiqueta());
        return "admin/galeria/etiquetas";
    }

    @PostMapping("/etiquetas")
    public String crearEtiqueta(@ModelAttribute Etiqueta etiqueta) {
        if (!etiquetaRepository.existsByNombre(etiqueta.getNombre())) {
            etiquetaRepository.save(etiqueta);
        }
        return "redirect:/admin/galeria/etiquetas";
    }

    @PostMapping("/etiquetas/{id}/toggle")
    public String toggleEtiqueta(@PathVariable Integer id) {
        etiquetaRepository.findById(id).ifPresent(etiqueta -> {
            etiqueta.setActiva(!etiqueta.getActiva());
            etiquetaRepository.save(etiqueta);
        });
        return "redirect:/admin/galeria/etiquetas";
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "jpg";
        }
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }
}