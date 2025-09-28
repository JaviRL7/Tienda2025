package com.donaarana.tienda.dto;

public class AuthResponseDto {
    private String token;
    private String type;
    private Integer id;
    private String nombre;
    private String correo;
    private String rol;

    // Constructor por defecto
    public AuthResponseDto() {}

    // Constructor con parámetros
    public AuthResponseDto(String token, String type, Integer id, String nombre, String correo, String rol) {
        this.token = token;
        this.type = type;
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.rol = rol;
    }

    // Getters y setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}