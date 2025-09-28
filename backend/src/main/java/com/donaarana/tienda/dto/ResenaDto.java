package com.donaarana.tienda.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ResenaDto {

    private Long id;

    @NotNull(message = "El rating es obligatorio")
    @Min(value = 1, message = "El rating mínimo es 1")
    @Max(value = 5, message = "El rating máximo es 5")
    private Integer rating;

    @NotBlank(message = "El comentario es obligatorio")
    private String comentario;

    private String nombre;
    private LocalDateTime fechaCreacion;
    private String iniciales;

    // Constructores
    public ResenaDto() {}

    public ResenaDto(Integer rating, String comentario) {
        this.rating = rating;
        this.comentario = comentario;
    }

    public ResenaDto(Long id, Integer rating, String comentario, String nombre, LocalDateTime fechaCreacion) {
        this.id = id;
        this.rating = rating;
        this.comentario = comentario;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.iniciales = generateInitials(nombre);
    }

    // Método para generar iniciales
    private String generateInitials(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return "??";
        }

        String[] parts = nombre.trim().split("\\s+");
        StringBuilder initials = new StringBuilder();

        for (int i = 0; i < Math.min(parts.length, 2); i++) {
            if (!parts[i].isEmpty()) {
                initials.append(parts[i].charAt(0));
            }
        }

        return initials.toString().toUpperCase();
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
        this.iniciales = generateInitials(nombre);
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getIniciales() {
        return iniciales;
    }

    public void setIniciales(String iniciales) {
        this.iniciales = iniciales;
    }
}