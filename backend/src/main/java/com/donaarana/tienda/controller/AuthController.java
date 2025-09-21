package com.donaarana.tienda.controller;

import com.donaarana.tienda.dto.JwtResponseDto;
import com.donaarana.tienda.dto.LoginDto;
import com.donaarana.tienda.dto.UsuarioRegistroDto;
import com.donaarana.tienda.entity.Usuario;
import com.donaarana.tienda.security.JwtUtils;
import com.donaarana.tienda.security.UserPrincipal;
import com.donaarana.tienda.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getCorreo(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            JwtResponseDto response = new JwtResponseDto(jwt, userDetails.getId(),
                    userDetails.getNombre(), userDetails.getCorreo());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Credenciales inválidas");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UsuarioRegistroDto signUpRequest) {
        try {
            if (usuarioService.existsByCorreo(signUpRequest.getCorreo())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El correo ya está registrado");
                return ResponseEntity.badRequest().body(error);
            }

            Usuario usuario = usuarioService.registrarUsuario(signUpRequest);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario registrado exitosamente");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}