package com.donaarana.tienda.controller;

import com.donaarana.tienda.repository.ProductoRepository;
import com.donaarana.tienda.repository.GaleriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private GaleriaRepository galeriaRepository;

    @GetMapping("/")
    public String home(Model model) {
        // Obtener productos en pantalla para mostrar en la página principal
        model.addAttribute("productos", productoRepository.findByEnPantalla(true));
        model.addAttribute("galeria", galeriaRepository.findByActivaTrueOrderByFechaSubidaDesc());
        return "index";
    }
}