package com.donaarana.tienda.controller;

import com.donaarana.tienda.entity.Apartado;
import com.donaarana.tienda.security.UserPrincipal;
import com.donaarana.tienda.service.ApartadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apartados")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApartadoController {

    @Autowired
    private ApartadoService apartadoService;

    @GetMapping("/mis-apartados")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Apartado>> getMisApartados(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Apartado> apartados = apartadoService.findByUsuarioId(userPrincipal.getId());
        return ResponseEntity.ok(apartados);
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<Apartado>> getApartadosByProducto(@PathVariable Integer productoId) {
        List<Apartado> apartados = apartadoService.findByProductoId(productoId);
        return ResponseEntity.ok(apartados);
    }

    @GetMapping("/producto/{productoId}/count")
    public ResponseEntity<Map<String, Integer>> getApartadosCountByProducto(@PathVariable Integer productoId) {
        Integer count = apartadoService.countByProductoId(productoId);
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/crear")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> crearApartado(@RequestParam Integer productoId, Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Apartado apartado = apartadoService.crearApartado(userPrincipal.getId(), productoId);
            return ResponseEntity.ok(apartado);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> eliminarApartado(@PathVariable Integer id, Authentication authentication) {
        try {
            apartadoService.eliminarApartado(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Apartado eliminado exitosamente");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/limpiar-expirados")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> limpiarApartadosExpirados() {
        apartadoService.limpiarApartadosExpirados();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Apartados expirados eliminados exitosamente");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verificar/{productoId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, Boolean>> verificarApartado(@PathVariable Integer productoId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        boolean existe = apartadoService.existsByUsuarioIdAndProductoId(userPrincipal.getId(), productoId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("existe", existe);
        return ResponseEntity.ok(response);
    }
}