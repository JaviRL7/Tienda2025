package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);

    @Query("SELECT u FROM Usuario u LEFT JOIN FETCH u.apartados WHERE u.id = :id")
    Optional<Usuario> findByIdWithApartados(@Param("id") Integer id);
}