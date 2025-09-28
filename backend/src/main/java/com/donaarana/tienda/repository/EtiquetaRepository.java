package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Etiqueta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Integer> {

    // Buscar por nombre exacto
    Optional<Etiqueta> findByNombre(String nombre);

    // Verificar si existe por nombre
    boolean existsByNombre(String nombre);

    // Buscar etiquetas activas ordenadas por nombre
    List<Etiqueta> findByActivaTrueOrderByNombreAsc();

    // Buscar etiquetas activas ordenadas por uso (más usadas primero)
    List<Etiqueta> findByActivaTrueOrderByTotalUsosDescNombreAsc();

    // Buscar etiquetas por texto parcial en nombre
    List<Etiqueta> findByActivaTrueAndNombreContainingIgnoreCaseOrderByNombreAsc(String texto);

    // Buscar etiquetas con al menos un uso
    List<Etiqueta> findByActivaTrueAndTotalUsosGreaterThanOrderByTotalUsosDescNombreAsc(Integer minimoUsos);

    // Buscar etiquetas sin uso (huérfanas)
    List<Etiqueta> findByActivaTrueAndTotalUsosOrderByNombreAsc(Integer ceroUsos);

    // Obtener las etiquetas más populares (top N)
    @Query("SELECT e FROM Etiqueta e WHERE e.activa = true AND e.totalUsos > 0 ORDER BY e.totalUsos DESC, e.nombre ASC")
    List<Etiqueta> findTopEtiquetas();

    // Buscar etiquetas por color
    List<Etiqueta> findByActivaTrueAndColorOrderByNombreAsc(String color);

    // Buscar o crear etiqueta por nombre
    @Query("SELECT e FROM Etiqueta e WHERE LOWER(e.nombre) = LOWER(:nombre)")
    Optional<Etiqueta> findByNombreIgnoreCase(@Param("nombre") String nombre);

    // Contar etiquetas activas
    @Query("SELECT COUNT(e) FROM Etiqueta e WHERE e.activa = true")
    Long countActivas();

    // Contar etiquetas con uso
    @Query("SELECT COUNT(e) FROM Etiqueta e WHERE e.activa = true AND e.totalUsos > 0")
    Long countConUso();
}