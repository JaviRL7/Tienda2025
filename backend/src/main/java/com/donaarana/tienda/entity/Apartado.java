package com.donaarana.tienda.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "apartados")
public class Apartado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    @NotNull(message = "El usuario es obligatorio")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    @NotNull(message = "El producto es obligatorio")
    private Producto producto;

    @Column(name = "fecha_apartado")
    private LocalDateTime fechaApartado = LocalDateTime.now();

    @Column(name = "fecha_expiracion")
    private LocalDateTime fechaExpiracion;

    public Apartado() {
        this.fechaApartado = LocalDateTime.now();
        this.fechaExpiracion = LocalDateTime.now().plusMonths(1);
    }

    public Apartado(Usuario usuario, Producto producto) {
        this();
        this.usuario = usuario;
        this.producto = producto;
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public LocalDateTime getFechaApartado() { return fechaApartado; }
    public void setFechaApartado(LocalDateTime fechaApartado) { this.fechaApartado = fechaApartado; }

    public LocalDateTime getFechaExpiracion() { return fechaExpiracion; }
    public void setFechaExpiracion(LocalDateTime fechaExpiracion) { this.fechaExpiracion = fechaExpiracion; }
}