package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    List<Categoria> findByTipoId(Integer tipoId);

    @Query("SELECT c FROM Categoria c JOIN FETCH c.tipo WHERE c.id = :id")
    Optional<Categoria> findByIdWithTipo(@Param("id") Integer id);

    @Query("SELECT c FROM Categoria c JOIN FETCH c.tipo")
    List<Categoria> findAllWithTipo();

    boolean existsByNombreAndTipoId(String nombre, Integer tipoId);
}