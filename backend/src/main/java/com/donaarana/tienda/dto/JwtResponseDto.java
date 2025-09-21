package com.donaarana.tienda.dto;

public class JwtResponseDto {

    private String token;
    private String type = "Bearer";
    private Integer id;
    private String nombre;
    private String correo;

    public JwtResponseDto(String token, Integer id, String nombre, String correo) {
        this.token = token;
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }

    // Getters y Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
}