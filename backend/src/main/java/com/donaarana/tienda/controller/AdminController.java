package com.donaarana.tienda.controller;

import com.donaarana.tienda.repository.ProductoRepository;
import com.donaarana.tienda.repository.UsuarioRepository;
import com.donaarana.tienda.repository.GaleriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private GaleriaRepository galeriaRepository;

    @GetMapping
    public String dashboard(Model model) {
        // Estadísticas básicas para el dashboard
        model.addAttribute("totalProductos", productoRepository.count());
        model.addAttribute("totalUsuarios", usuarioRepository.count());
        model.addAttribute("totalFotosGaleria", galeriaRepository.count());
        model.addAttribute("productosEnPantalla", productoRepository.findByEnPantalla(true).size());

        return "admin/dashboard";
    }
}