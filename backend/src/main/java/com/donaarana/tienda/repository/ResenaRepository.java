package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Resena;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {

    // Obtener todas las reseñas activas ordenadas por fecha de creación
    List<Resena> findByActivaTrueOrderByFechaCreacionDesc();

    // Obtener reseñas activas con paginación
    Page<Resena> findByActivaTrueOrderByFechaCreacionDesc(Pageable pageable);

    // Obtener reseñas por usuario
    List<Resena> findByUsuarioIdAndActivaTrueOrderByFechaCreacionDesc(Long usuarioId);

    // Contar reseñas activas
    long countByActivaTrue();

    // Obtener rating promedio
    @Query("SELECT AVG(r.rating) FROM Resena r WHERE r.activa = true")
    Double findAverageRating();

    // Contar reseñas por rating
    @Query("SELECT r.rating, COUNT(r) FROM Resena r WHERE r.activa = true GROUP BY r.rating ORDER BY r.rating")
    List<Object[]> countByRating();
}