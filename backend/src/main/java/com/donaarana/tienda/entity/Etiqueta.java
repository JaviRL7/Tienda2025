package com.donaarana.tienda.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "etiquetas")
public class Etiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 7)
    private String color = "#007bff";

    @Column(nullable = false)
    private Boolean activa = true;

    @Column(name = "total_usos", nullable = false)
    private Integer totalUsos = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Relación muchos a muchos con galería (lado inverso)
    @ManyToMany(mappedBy = "etiquetas", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Galeria> imagenes = new HashSet<>();

    public Etiqueta() {
        this.createdAt = LocalDateTime.now();
    }

    public Etiqueta(String nombre) {
        this();
        this.nombre = nombre.toLowerCase().trim();
    }

    public Etiqueta(String nombre, String descripcion, String color) {
        this(nombre);
        this.descripcion = descripcion;
        this.color = color;
    }

    // Métodos de utilidad
    public void incrementarUso() {
        this.totalUsos++;
    }

    public void decrementarUso() {
        if (this.totalUsos > 0) {
            this.totalUsos--;
        }
    }

    public void actualizarContadorUsos() {
        this.totalUsos = this.imagenes.size();
    }

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre != null ? nombre.toLowerCase().trim() : null;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public Integer getTotalUsos() {
        return totalUsos;
    }

    public void setTotalUsos(Integer totalUsos) {
        this.totalUsos = totalUsos;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Galeria> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<Galeria> imagenes) {
        this.imagenes = imagenes;
    }

    // Para facilitar uso en templates
    public String getNombreCapitalizado() {
        if (nombre == null || nombre.isEmpty()) return "";
        return nombre.substring(0, 1).toUpperCase() + nombre.substring(1);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Etiqueta etiqueta = (Etiqueta) obj;
        return nombre != null && nombre.equals(etiqueta.nombre);
    }

    @Override
    public int hashCode() {
        return nombre != null ? nombre.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Etiqueta{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", totalUsos=" + totalUsos +
                '}';
    }
}