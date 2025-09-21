package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Apartado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApartadoRepository extends JpaRepository<Apartado, Integer> {

    List<Apartado> findByUsuarioId(Integer usuarioId);

    List<Apartado> findByProductoId(Integer productoId);

    @Query("SELECT a FROM Apartado a JOIN FETCH a.usuario JOIN FETCH a.producto WHERE a.usuario.id = :usuarioId")
    List<Apartado> findByUsuarioIdWithDetails(@Param("usuarioId") Integer usuarioId);

    @Query("SELECT a FROM Apartado a WHERE a.fechaExpiracion < :fecha")
    List<Apartado> findExpiredApartados(@Param("fecha") LocalDateTime fecha);

    boolean existsByUsuarioIdAndProductoId(Integer usuarioId, Integer productoId);

    @Query("SELECT COUNT(a) FROM Apartado a WHERE a.producto.id = :productoId")
    Integer countByProductoId(@Param("productoId") Integer productoId);
}