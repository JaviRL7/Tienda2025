package com.donaarana.tienda.controller;

import com.donaarana.tienda.dto.ResenaDto;
import com.donaarana.tienda.entity.Resena;
import com.donaarana.tienda.entity.Usuario;
import com.donaarana.tienda.repository.ResenaRepository;
import com.donaarana.tienda.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resenas")
@CrossOrigin(origins = "*")
public class ResenaApiController {

    @Autowired
    private ResenaRepository resenaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Obtener todas las reseñas activas
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllResenas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Resena> resenasPage = resenaRepository.findByActivaTrueOrderByFechaCreacionDesc(pageable);

            List<ResenaDto> resenas = resenasPage.getContent().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

            // Obtener estadísticas
            Double averageRating = resenaRepository.findAverageRating();
            long totalResenas = resenaRepository.countByActivaTrue();

            Map<String, Object> response = new HashMap<>();
            response.put("resenas", resenas);
            response.put("totalElements", resenasPage.getTotalElements());
            response.put("totalPages", resenasPage.getTotalPages());
            response.put("currentPage", page);
            response.put("size", size);
            response.put("averageRating", averageRating != null ? Math.round(averageRating * 10.0) / 10.0 : 0.0);
            response.put("totalResenas", totalResenas);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener las reseñas: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Crear nueva reseña (requiere autenticación)
    @PostMapping
    public ResponseEntity<Map<String, Object>> createResena(
            @Valid @RequestBody ResenaDto resenaDto,
            HttpServletRequest request) {

        try {
            // Verificar que hay un token de autorización
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Token de autenticación requerido");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Para esta implementación simplificada, aceptamos cualquier token Bearer válido
            // y usamos el primer usuario disponible como temporal
            // NOTA: En producción, esto debe extraer el usuario real del token JWT
            List<Usuario> usuarios = usuarioRepository.findAll();
            if (usuarios.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "No hay usuarios registrados en el sistema");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            Usuario usuario = usuarios.get(0); // TEMPORAL: usar el primer usuario disponible

            // Crear la reseña
            Resena resena = new Resena();
            resena.setUsuarioId(usuario.getId().longValue());
            resena.setNombre(usuario.getNombre());
            resena.setRating(resenaDto.getRating());
            resena.setComentario(resenaDto.getComentario());

            Resena savedResena = resenaRepository.save(resena);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Reseña creada exitosamente");
            response.put("resena", convertToDto(savedResena));

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al crear la reseña: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Obtener reseñas del usuario autenticado
    @GetMapping("/mis-resenas")
    public ResponseEntity<Map<String, Object>> getMisResenas(HttpServletRequest request) {
        try {
            // Verificar que hay un token de autorización
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Token de autenticación requerido");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Implementación temporal: usar el primer usuario
            List<Usuario> usuarios = usuarioRepository.findAll();
            if (usuarios.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "No hay usuarios registrados en el sistema");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            Usuario usuario = usuarios.get(0); // TEMPORAL
            List<Resena> resenas = resenaRepository.findByUsuarioIdAndActivaTrueOrderByFechaCreacionDesc(usuario.getId().longValue());

            List<ResenaDto> resenasDto = resenas.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("resenas", resenasDto);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener las reseñas: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Método auxiliar para convertir entidad a DTO
    private ResenaDto convertToDto(Resena resena) {
        ResenaDto dto = new ResenaDto();
        dto.setId(resena.getId());
        dto.setRating(resena.getRating());
        dto.setComentario(resena.getComentario());
        dto.setNombre(resena.getNombre());
        dto.setFechaCreacion(resena.getFechaCreacion());
        return dto;
    }
}