package com.donaarana.tienda.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El código de color es obligatorio")
    @Size(max = 50, message = "El código de color no puede exceder 50 caracteres")
    @Column(name = "codigo_color")
    private String codigoColor;

    @NotBlank(message = "El código tintada es obligatorio")
    @Size(max = 50, message = "El código tintada no puede exceder 50 caracteres")
    @Column(name = "codigo_tintada")
    private String codigoTintada;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal precio = BigDecimal.ZERO;

    @Column(name = "en_pantalla")
    private Boolean enPantalla = false;

    @Size(max = 255, message = "La URL de imagen no puede exceder 255 caracteres")
    private String img;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Apartado> apartados = new HashSet<>();

    public Producto() {}

    public Producto(String codigoColor, String codigoTintada, BigDecimal precio, Boolean enPantalla, String img, Categoria categoria) {
        this.codigoColor = codigoColor;
        this.codigoTintada = codigoTintada;
        this.precio = precio;
        this.enPantalla = enPantalla;
        this.img = img;
        this.categoria = categoria;
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getCodigoColor() { return codigoColor; }
    public void setCodigoColor(String codigoColor) { this.codigoColor = codigoColor; }

    public String getCodigoTintada() { return codigoTintada; }
    public void setCodigoTintada(String codigoTintada) { this.codigoTintada = codigoTintada; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Boolean getEnPantalla() { return enPantalla; }
    public void setEnPantalla(Boolean enPantalla) { this.enPantalla = enPantalla; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public Set<Apartado> getApartados() { return apartados; }
    public void setApartados(Set<Apartado> apartados) { this.apartados = apartados; }
}