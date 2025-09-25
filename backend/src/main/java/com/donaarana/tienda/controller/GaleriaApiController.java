package com.donaarana.tienda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/management/galeria")
@CrossOrigin(origins = "*")
public class GaleriaApiController {

    @GetMapping("/tags")
    public ResponseEntity<List<String>> obtenerTags() {
        // Por ahora devolver una lista vacía o algunos tags de ejemplo
        List<String> tags = new ArrayList<>();
        tags.add("lana");
        tags.add("algodón");
        tags.add("merino");
        tags.add("color");
        return ResponseEntity.ok(tags);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> obtenerGaleria() {
        List<Map<String, Object>> galeria = new ArrayList<>();

        // Ejemplo de imagen en la galería
        Map<String, Object> imagen = new HashMap<>();
        imagen.put("id", 1);
        imagen.put("url", "/images/gallery/sample.jpg");
        imagen.put("titulo", "Ejemplo");
        imagen.put("descripcion", "Imagen de ejemplo");
        imagen.put("tags", List.of("lana", "color"));

        galeria.add(imagen);
        return ResponseEntity.ok(galeria);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearImagen(@RequestBody Map<String, Object> imagen) {
        // Simular creación - en una implementación real se guardaría en BD
        imagen.put("id", System.currentTimeMillis()); // ID temporal
        return ResponseEntity.ok(imagen);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarImagen(@PathVariable Long id, @RequestBody Map<String, Object> imagen) {
        imagen.put("id", id);
        return ResponseEntity.ok(imagen);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarImagen(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }
}