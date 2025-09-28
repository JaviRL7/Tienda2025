package com.donaarana.tienda.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "galeria")
public class Galeria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "nombre_archivo", nullable = false)
    private String nombreArchivo;

    @Column(nullable = false, length = 500)
    private String ruta;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "tamaño_bytes")
    private Integer tamañoBytes;

    @Column(name = "tipo_mime", length = 100)
    private String tipoMime;

    @Column(name = "ancho_px")
    private Integer anchoPx;

    @Column(name = "alto_px")
    private Integer altoPx;

    @Column(name = "fecha_subida")
    private LocalDateTime fechaSubida;

    @Column(nullable = false)
    private Boolean activa = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relación muchos a muchos con etiquetas
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "galeria_etiquetas",
        joinColumns = @JoinColumn(name = "galeria_id"),
        inverseJoinColumns = @JoinColumn(name = "etiqueta_id")
    )
    @JsonManagedReference
    private Set<Etiqueta> etiquetas = new HashSet<>();

    public Galeria() {
        this.fechaSubida = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Galeria(String nombre, String nombreArchivo, String ruta) {
        this();
        this.nombre = nombre;
        this.nombreArchivo = nombreArchivo;
        this.ruta = ruta;
    }

    // Métodos de utilidad
    public void agregarEtiqueta(Etiqueta etiqueta) {
        this.etiquetas.add(etiqueta);
        etiqueta.getImagenes().add(this);
        etiqueta.incrementarUso();
    }

    public void removerEtiqueta(Etiqueta etiqueta) {
        this.etiquetas.remove(etiqueta);
        etiqueta.getImagenes().remove(this);
        etiqueta.decrementarUso();
    }

    public void limpiarEtiquetas() {
        for (Etiqueta etiqueta : new HashSet<>(this.etiquetas)) {
            removerEtiqueta(etiqueta);
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
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
        this.nombre = nombre;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getTamañoBytes() {
        return tamañoBytes;
    }

    public void setTamañoBytes(Integer tamañoBytes) {
        this.tamañoBytes = tamañoBytes;
    }

    public String getTipoMime() {
        return tipoMime;
    }

    public void setTipoMime(String tipoMime) {
        this.tipoMime = tipoMime;
    }

    public Integer getAnchoPx() {
        return anchoPx;
    }

    public void setAnchoPx(Integer anchoPx) {
        this.anchoPx = anchoPx;
    }

    public Integer getAltoPx() {
        return altoPx;
    }

    public void setAltoPx(Integer altoPx) {
        this.altoPx = altoPx;
    }

    public LocalDateTime getFechaSubida() {
        return fechaSubida;
    }

    public void setFechaSubida(LocalDateTime fechaSubida) {
        this.fechaSubida = fechaSubida;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Etiqueta> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
    }

    // Métodos de conveniencia para templates
    public String getTamañoHumano() {
        if (tamañoBytes == null) return "Desconocido";

        if (tamañoBytes < 1024) return tamañoBytes + " B";
        else if (tamañoBytes < 1024 * 1024) return String.format("%.1f KB", tamañoBytes / 1024.0);
        else return String.format("%.1f MB", tamañoBytes / (1024.0 * 1024.0));
    }

    public String getDimensiones() {
        if (anchoPx != null && altoPx != null) {
            return anchoPx + " × " + altoPx + " px";
        }
        return "Desconocido";
    }
}