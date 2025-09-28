package com.donaarana.tienda.controller;

import com.donaarana.tienda.entity.Producto;
import com.donaarana.tienda.entity.Categoria;
import com.donaarana.tienda.repository.ProductoRepository;
import com.donaarana.tienda.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Controller
@RequestMapping("/admin/productos")
public class ProductoAdminController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private final String uploadDir = "src/main/resources/static/productos/";

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("productos", productoRepository.findAll());
        return "admin/productos/lista";
    }

    @GetMapping("/nuevo")
    public String nuevo(Model model) {
        model.addAttribute("producto", new Producto());
        model.addAttribute("categorias", categoriaRepository.findAll());
        return "admin/productos/form";
    }

    @PostMapping("/guardar")
    public String guardar(@ModelAttribute Producto producto,
                         @RequestParam(value = "fotoFile", required = false) MultipartFile fotoFile) throws IOException {

        // Manejar subida de foto si se proporcionó
        if (fotoFile != null && !fotoFile.isEmpty()) {
            String rutaFoto = guardarFoto(fotoFile);
            producto.setImg(rutaFoto);
        }

        productoRepository.save(producto);
        return "redirect:/admin/productos";
    }

    @GetMapping("/editar/{id}")
    public String editar(@PathVariable Integer id, Model model) {
        Producto producto = productoRepository.findById(id).orElseThrow();
        model.addAttribute("producto", producto);
        model.addAttribute("categorias", categoriaRepository.findAll());
        return "admin/productos/form";
    }

    @PostMapping("/editar/{id}")
    public String actualizar(@PathVariable Integer id,
                           @ModelAttribute Producto producto,
                           @RequestParam(value = "fotoFile", required = false) MultipartFile fotoFile) throws IOException {

        Producto productoExistente = productoRepository.findById(id).orElseThrow();

        // Actualizar campos básicos
        productoExistente.setCodigoColor(producto.getCodigoColor());
        productoExistente.setCodigoTintada(producto.getCodigoTintada());
        productoExistente.setPrecio(producto.getPrecio());
        productoExistente.setEnPantalla(producto.getEnPantalla());
        productoExistente.setCategoria(producto.getCategoria());

        // Manejar subida de nueva foto si se proporcionó
        if (fotoFile != null && !fotoFile.isEmpty()) {
            String rutaFoto = guardarFoto(fotoFile);
            productoExistente.setImg(rutaFoto);
        }

        productoRepository.save(productoExistente);
        return "redirect:/admin/productos";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        productoRepository.deleteById(id);
        return "redirect:/admin/productos";
    }

    private String guardarFoto(MultipartFile file) throws IOException {
        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String extension = getFileExtension(file.getOriginalFilename());
        String nombreArchivo = "producto_" + UUID.randomUUID().toString() + "." + extension;

        // Guardar archivo
        Path filePath = uploadPath.resolve(nombreArchivo);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/productos/" + nombreArchivo;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "jpg";
        }
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }
}