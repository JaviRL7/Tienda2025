package com.donaarana.tienda.dto;

public class RegisterDto {
    private String nombre;
    private String correo;
    private String password;

    // Constructor por defecto
    public RegisterDto() {}

    // Constructor con parámetros
    public RegisterDto(String nombre, String correo, String password) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
    }

    // Getters y setters
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}