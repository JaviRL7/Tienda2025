package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Integer> {

    Optional<Tipo> findByNombre(String nombre);

    boolean existsByNombre(String nombre);

    @Query("SELECT t FROM Tipo t LEFT JOIN FETCH t.categorias WHERE t.id = :id")
    Optional<Tipo> findByIdWithCategorias(@Param("id") Integer id);

    @Query("SELECT t FROM Tipo t LEFT JOIN FETCH t.categorias")
    List<Tipo> findAllWithCategorias();
}