package com.donaarana.tienda.service;

import com.donaarana.tienda.entity.Producto;
import com.donaarana.tienda.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Optional<Producto> findById(Integer id) {
        return productoRepository.findById(id);
    }

    public Optional<Producto> findByIdWithCategoria(Integer id) {
        return productoRepository.findByIdWithCategoria(id);
    }

    public List<Producto> findByEnPantalla(Boolean enPantalla) {
        return productoRepository.findByEnPantalla(enPantalla);
    }

    public List<Producto> findByCategoriaId(Integer categoriaId) {
        return productoRepository.findByCategoriaId(categoriaId);
    }

    public List<Producto> findDisplayedProductsWithDetails() {
        return productoRepository.findDisplayedProductsWithCategoryAndType();
    }

    public List<Producto> findByCodigoContaining(String codigo) {
        return productoRepository.findByCodigoContaining(codigo);
    }

    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Integer id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setCodigoColor(productoActualizado.getCodigoColor());
                    producto.setCodigoTintada(productoActualizado.getCodigoTintada());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setEnPantalla(productoActualizado.getEnPantalla());
                    producto.setImg(productoActualizado.getImg());
                    producto.setCategoria(productoActualizado.getCategoria());
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    public void eliminarProducto(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con id: " + id);
        }
        productoRepository.deleteById(id);
    }
}