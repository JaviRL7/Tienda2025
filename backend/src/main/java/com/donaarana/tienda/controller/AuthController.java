package com.donaarana.tienda.controller;

import com.donaarana.tienda.entity.Usuario;
import com.donaarana.tienda.repository.UsuarioRepository;
import com.donaarana.tienda.dto.LoginDto;
import com.donaarana.tienda.dto.RegisterDto;
import com.donaarana.tienda.dto.AuthResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginDto loginDto) {
        try {
            Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(loginDto.getCorreo());

            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(404).body("{\"message\": \"No existe una cuenta con este correo electrónico\"}");
            }

            Usuario usuario = usuarioOpt.get();

            // Verificar contraseña (asumiendo que las contraseñas están hasheadas)
            if (!passwordEncoder.matches(loginDto.getPassword(), usuario.getPassword())) {
                return ResponseEntity.status(401).body("{\"message\": \"Credenciales incorrectas\"}");
            }

            // Generar token simple (en producción usar JWT)
            String token = UUID.randomUUID().toString();

            AuthResponseDto response = new AuthResponseDto();
            response.setToken(token);
            response.setType("Bearer");
            response.setId(usuario.getId());
            response.setNombre(usuario.getNombre());
            response.setCorreo(usuario.getCorreo());
            response.setRol(usuario.getRol() != null ? usuario.getRol() : "user");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Error interno del servidor\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        try {
            // Verificar si el usuario ya existe
            if (usuarioRepository.findByCorreo(registerDto.getCorreo()).isPresent()) {
                return ResponseEntity.status(400).body("{\"message\": \"Ya existe una cuenta con este correo electrónico\"}");
            }

            // Crear nuevo usuario
            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setNombre(registerDto.getNombre());
            nuevoUsuario.setCorreo(registerDto.getCorreo());
            nuevoUsuario.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            nuevoUsuario.setRol("user"); // Rol por defecto

            usuarioRepository.save(nuevoUsuario);

            return ResponseEntity.ok("{\"message\": \"Usuario creado exitosamente\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Error interno del servidor\"}");
        }
    }
}