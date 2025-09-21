package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Complemento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplementoRepository extends JpaRepository<Complemento, Integer> {

    List<Complemento> findByNombreContainingIgnoreCase(String nombre);

    @Query("SELECT c FROM Complemento c WHERE c.cantidad > 0")
    List<Complemento> findAvailableComplementos();

    @Query("SELECT c FROM Complemento c WHERE c.cantidad <= :limite")
    List<Complemento> findLowStockComplementos(@Param("limite") Integer limite);

    boolean existsByNombre(String nombre);
}