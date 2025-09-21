package com.donaarana.tienda.service;

import com.donaarana.tienda.entity.Apartado;
import com.donaarana.tienda.entity.Producto;
import com.donaarana.tienda.entity.Usuario;
import com.donaarana.tienda.repository.ApartadoRepository;
import com.donaarana.tienda.repository.ProductoRepository;
import com.donaarana.tienda.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ApartadoService {

    @Autowired
    private ApartadoRepository apartadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Apartado> findAll() {
        return apartadoRepository.findAll();
    }

    public Optional<Apartado> findById(Integer id) {
        return apartadoRepository.findById(id);
    }

    public List<Apartado> findByUsuarioId(Integer usuarioId) {
        return apartadoRepository.findByUsuarioIdWithDetails(usuarioId);
    }

    public List<Apartado> findByProductoId(Integer productoId) {
        return apartadoRepository.findByProductoId(productoId);
    }

    public Apartado crearApartado(Integer usuarioId, Integer productoId) {
        if (apartadoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId)) {
            throw new RuntimeException("Ya existe un apartado para este producto y usuario");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Apartado apartado = new Apartado(usuario, producto);
        return apartadoRepository.save(apartado);
    }

    public void eliminarApartado(Integer id) {
        if (!apartadoRepository.existsById(id)) {
            throw new RuntimeException("Apartado no encontrado con id: " + id);
        }
        apartadoRepository.deleteById(id);
    }

    public List<Apartado> findExpiredApartados() {
        return apartadoRepository.findExpiredApartados(LocalDateTime.now());
    }

    public void limpiarApartadosExpirados() {
        List<Apartado> expirados = findExpiredApartados();
        apartadoRepository.deleteAll(expirados);
    }

    public Integer countByProductoId(Integer productoId) {
        return apartadoRepository.countByProductoId(productoId);
    }

    public boolean existsByUsuarioIdAndProductoId(Integer usuarioId, Integer productoId) {
        return apartadoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId);
    }
}