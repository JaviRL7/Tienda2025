package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Galeria;
import com.donaarana.tienda.entity.Etiqueta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GaleriaRepository extends JpaRepository<Galeria, Integer> {

    // Buscar imágenes activas
    List<Galeria> findByActivaTrueOrderByFechaSubidaDesc();

    // Buscar con paginación
    Page<Galeria> findByActivaTrueOrderByFechaSubidaDesc(Pageable pageable);

    // Buscar por etiqueta específica
    @Query("SELECT DISTINCT g FROM Galeria g JOIN g.etiquetas e WHERE e.nombre = :nombreEtiqueta AND g.activa = true ORDER BY g.fechaSubida DESC")
    List<Galeria> findByEtiquetaNombre(@Param("nombreEtiqueta") String nombreEtiqueta);

    // Buscar por múltiples etiquetas (AND)
    @Query("SELECT g FROM Galeria g JOIN g.etiquetas e WHERE e.nombre IN :nombresEtiquetas AND g.activa = true GROUP BY g.id HAVING COUNT(DISTINCT e.id) = :cantidadEtiquetas ORDER BY g.fechaSubida DESC")
    List<Galeria> findByTodasLasEtiquetas(@Param("nombresEtiquetas") List<String> nombresEtiquetas, @Param("cantidadEtiquetas") long cantidadEtiquetas);

    // Buscar por cualquier etiqueta (OR)
    @Query("SELECT DISTINCT g FROM Galeria g JOIN g.etiquetas e WHERE e.nombre IN :nombresEtiquetas AND g.activa = true ORDER BY g.fechaSubida DESC")
    List<Galeria> findByAlgunasEtiquetas(@Param("nombresEtiquetas") List<String> nombresEtiquetas);

    // Búsqueda por texto en nombre o descripción
    @Query("SELECT g FROM Galeria g WHERE g.activa = true AND (LOWER(g.nombre) LIKE LOWER(CONCAT('%', :texto, '%')) OR LOWER(g.descripcion) LIKE LOWER(CONCAT('%', :texto, '%'))) ORDER BY g.fechaSubida DESC")
    List<Galeria> findByTexto(@Param("texto") String texto);

    // Contar imágenes por etiqueta
    @Query("SELECT COUNT(DISTINCT g) FROM Galeria g JOIN g.etiquetas e WHERE e.nombre = :nombreEtiqueta AND g.activa = true")
    Long countByEtiquetaNombre(@Param("nombreEtiqueta") String nombreEtiqueta);

    // Obtener las imágenes más recientes
    List<Galeria> findTop10ByActivaTrueOrderByFechaSubidaDesc();

    // Buscar por rango de fechas
    List<Galeria> findByActivaTrueAndFechaSubidaBetweenOrderByFechaSubidaDesc(LocalDateTime inicio, LocalDateTime fin);

    // Buscar por tipo de archivo
    List<Galeria> findByActivaTrueAndTipoMimeContainingIgnoreCaseOrderByFechaSubidaDesc(String tipoMime);

    // Buscar imágenes sin etiquetas
    @Query("SELECT g FROM Galeria g WHERE g.activa = true AND g.etiquetas IS EMPTY ORDER BY g.fechaSubida DESC")
    List<Galeria> findSinEtiquetas();

    // Buscar por tamaño de archivo
    List<Galeria> findByActivaTrueAndTamañoBytesGreaterThanOrderByTamañoBytesDesc(Integer tamañoMinimo);
    List<Galeria> findByActivaTrueAndTamañoBytesLessThanOrderByTamañoBytesAsc(Integer tamañoMaximo);
}