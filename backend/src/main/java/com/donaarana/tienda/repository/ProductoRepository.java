package com.donaarana.tienda.repository;

import com.donaarana.tienda.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    List<Producto> findByEnPantalla(Boolean enPantalla);

    List<Producto> findByCategoriaId(Integer categoriaId);

    @Query("SELECT p FROM Producto p JOIN FETCH p.categoria WHERE p.id = :id")
    Optional<Producto> findByIdWithCategoria(@Param("id") Integer id);

    @Query("SELECT p FROM Producto p LEFT JOIN FETCH p.categoria WHERE p.enPantalla = true")
    List<Producto> findDisplayedProductsWithCategoryAndType();

    @Query("SELECT p FROM Producto p WHERE p.codigoColor LIKE %:codigo% OR p.codigoTintada LIKE %:codigo%")
    List<Producto> findByCodigoContaining(@Param("codigo") String codigo);
}