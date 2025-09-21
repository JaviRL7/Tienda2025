// Datos de prueba para los 15 productos Katia con nueva estructura
export interface Marca {
  id: number;
  nombre: string;
  descripcion: string;
  logo?: string;
  activa: boolean;
}

export interface Tipo {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface Categoria {
  id: number;
  tipoId: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
  tipo: Tipo;
}

export interface Color {
  id: number;
  nombre: string;
  codigo: string;
  hexColor: string;
  activo: boolean;
}

export interface VarianteProducto {
  id: number;
  productoId: number;
  nombreVariante: string;
  pesoOvillo: number;
  metrosOvillo: number;
  agujaRecomendadaMin: number;
  agujaRecomendadaMax: number;
  grosor: string;
  composicion: string;
  temporada: string;
  activa: boolean;
}

export interface ProductoColor {
  id: number;
  varianteId: number;
  colorId: number;
  sku: string;
  precioBase: number;
  precioOferta?: number;
  stockActual: number;
  disponible: boolean;
  imagenPrincipal: string;
  color: Color;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  marcaId: number;
  categoriaId: number;
  descripcionCorta: string;
  activo: boolean;
  destacado: boolean;
  enPantalla: boolean;
  marca: Marca;
  categoria: Categoria;
  variantes: VarianteProducto[];
  colores: ProductoColor[];
}

// Datos mock
export const marcas: Marca[] = [
  {
    id: 1,
    nombre: 'Katia',
    descripcion: 'Hilos y lanas de alta calidad desde 1978',
    activa: true
  }
];

export const tipos: Tipo[] = [
  { id: 1, nombre: 'Lanas', descripcion: 'Hilos de lana natural y mezclas', activo: true },
  { id: 2, nombre: 'Algodones', descripcion: 'Hilos de algodón puro y mezclas', activo: true },
  { id: 3, nombre: 'Especiales', descripcion: 'Hilos con fibras especiales', activo: true }
];

export const categorias: Categoria[] = [
  { id: 1, tipoId: 1, nombre: 'Merino', descripcion: 'Lana merino de alta calidad', activa: true, tipo: tipos[0] },
  { id: 2, tipoId: 1, nombre: 'Lana Gruesa', descripcion: 'Lanas de grosor aran y chunky', activa: true, tipo: tipos[0] },
  { id: 3, tipoId: 2, nombre: 'Algodón Mercerizado', descripcion: 'Algodón con tratamiento mercerizado', activa: true, tipo: tipos[1] },
  { id: 4, tipoId: 2, nombre: 'Algodón Natural', descripcion: 'Algodón 100% natural', activa: true, tipo: tipos[1] },
  { id: 5, tipoId: 3, nombre: 'Fibras Mixtas', descripcion: 'Mezclas especiales de fibras', activa: true, tipo: tipos[2] }
];

export const colores: Color[] = [
  { id: 1, nombre: 'Rojo', codigo: 'ROJ', hexColor: '#DC2626', activo: true },
  { id: 2, nombre: 'Azul', codigo: 'AZU', hexColor: '#2563EB', activo: true },
  { id: 3, nombre: 'Verde', codigo: 'VER', hexColor: '#16A34A', activo: true },
  { id: 4, nombre: 'Amarillo', codigo: 'AMA', hexColor: '#EAB308', activo: true },
  { id: 5, nombre: 'Blanco', codigo: 'BLA', hexColor: '#FFFFFF', activo: true },
  { id: 6, nombre: 'Negro', codigo: 'NEG', hexColor: '#000000', activo: true },
  { id: 7, nombre: 'Rosa', codigo: 'ROS', hexColor: '#EC4899', activo: true },
  { id: 8, nombre: 'Violeta', codigo: 'VIO', hexColor: '#7C3AED', activo: true },
  { id: 9, nombre: 'Naranja', codigo: 'NAR', hexColor: '#EA580C', activo: true },
  { id: 10, nombre: 'Gris', codigo: 'GRI', hexColor: '#6B7280', activo: true }
];

export const productos: Producto[] = [
  // 1. Katia Panama (algodón mercerizado)
  {
    id: 1,
    nombre: 'Katia Panama',
    slug: 'katia-panama',
    marcaId: 1,
    categoriaId: 3,
    descripcionCorta: 'Algodón mercerizado ligero y fresco',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[2],
    variantes: [
      {
        id: 1,
        productoId: 1,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 125,
        agujaRecomendadaMin: 4.0,
        agujaRecomendadaMax: 4.5,
        grosor: 'DK',
        composicion: '100% Algodón Mercerizado',
        temporada: 'Primavera/Verano',
        activa: true
      }
    ],
    colores: [
      {
        id: 1,
        varianteId: 1,
        colorId: 1,
        sku: 'KAT-PAN-DK-ROJ-001',
        precioBase: 4.50,
        stockActual: 25,
        disponible: true,
        imagenPrincipal: '/productos/p1.jpg',
        color: colores[0]
      }
    ]
  },
  // 2. Katia Merino Classic (lana merino)
  {
    id: 2,
    nombre: 'Katia Merino Classic',
    slug: 'katia-merino-classic',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana merino versátil para prendas de todo uso',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 2,
        productoId: 2,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 110,
        agujaRecomendadaMin: 4.0,
        agujaRecomendadaMax: 4.5,
        grosor: 'DK',
        composicion: '100% Lana Merino',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 2,
        varianteId: 2,
        colorId: 1,
        sku: 'KAT-MER-CLA-ROJ-001',
        precioBase: 6.25,
        stockActual: 15,
        disponible: true,
        imagenPrincipal: '/productos/p2.jpg',
        color: colores[0]
      }
    ]
  },
  // 3. Katia Merino Ombré (kit degradado merino)
  {
    id: 3,
    nombre: 'Katia Merino Ombré',
    slug: 'katia-merino-ombre',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Kit de ovillos merino en degradado de colores',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 3,
        productoId: 3,
        nombreVariante: 'Kit Degradado',
        pesoOvillo: 250,
        metrosOvillo: 550,
        agujaRecomendadaMin: 4.0,
        agujaRecomendadaMax: 4.5,
        grosor: 'DK',
        composicion: '100% Lana Merino',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 3,
        varianteId: 3,
        colorId: 1,
        sku: 'KAT-MER-OMB-MIX-001',
        precioBase: 28.50,
        stockActual: 8,
        disponible: true,
        imagenPrincipal: '/productos/p3.jpg',
        color: colores[0]
      }
    ]
  },
  // 4. Katia Concept Heli Socks (calcetines)
  {
    id: 4,
    nombre: 'Katia Concept Heli Socks',
    slug: 'katia-concept-heli-socks',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana especial para calcetines con mezcla resistente',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 4,
        productoId: 4,
        nombreVariante: 'Fingering Weight',
        pesoOvillo: 100,
        metrosOvillo: 420,
        agujaRecomendadaMin: 2.5,
        agujaRecomendadaMax: 3.5,
        grosor: 'Fingering',
        composicion: '75% Lana Superwash, 25% Poliamida',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 4,
        varianteId: 4,
        colorId: 3,
        sku: 'KAT-HEL-SOC-VER-001',
        precioBase: 8.75,
        stockActual: 15,
        disponible: true,
        imagenPrincipal: '/productos/p4.jpg',
        color: colores[2]
      }
    ]
  },
  // 5. Katia Holi (lana multicolor suave)
  {
    id: 5,
    nombre: 'Katia Holi',
    slug: 'katia-holi',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Ovillo multicolor de tacto suave y alegre',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 5,
        productoId: 5,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 145,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '100% Lana',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 5,
        varianteId: 5,
        colorId: 5,
        sku: 'KAT-HOL-DK-MIX-001',
        precioBase: 5.90,
        stockActual: 35,
        disponible: true,
        imagenPrincipal: '/productos/p5.jpg',
        color: colores[4]
      }
    ]
  },
  // 6. Katia Paint Lover (ovillo XL multicolor)
  {
    id: 6,
    nombre: 'Katia Paint Lover',
    slug: 'katia-paint-lover',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Ovillo grande multicolor ideal para chales y bufandas',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 6,
        productoId: 6,
        nombreVariante: 'XL Ball',
        pesoOvillo: 150,
        metrosOvillo: 300,
        agujaRecomendadaMin: 6.0,
        agujaRecomendadaMax: 8.0,
        grosor: 'Worsted',
        composicion: '50% Lana, 50% Acrílico',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 6,
        varianteId: 6,
        colorId: 1,
        sku: 'KAT-PAI-LOV-MIX-001',
        precioBase: 15.75,
        stockActual: 12,
        disponible: true,
        imagenPrincipal: '/productos/p6.jpg',
        color: colores[0]
      }
    ]
  },
  // 7. Katia Polar Extreme (lana fantasía muy gruesa)
  {
    id: 7,
    nombre: 'Katia Polar Extreme',
    slug: 'katia-polar-extreme',
    marcaId: 1,
    categoriaId: 2,
    descripcionCorta: 'Lana extra gruesa efecto pelo, cálida y suave',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[1],
    variantes: [
      {
        id: 7,
        productoId: 7,
        nombreVariante: 'Super Chunky',
        pesoOvillo: 100,
        metrosOvillo: 75,
        agujaRecomendadaMin: 10.0,
        agujaRecomendadaMax: 12.0,
        grosor: 'Super Chunky',
        composicion: '100% Poliéster',
        temporada: 'Otoño/Invierno',
        activa: true
      }
    ],
    colores: [
      {
        id: 7,
        varianteId: 7,
        colorId: 9,
        sku: 'KAT-POL-EXT-NAR-001',
        precioBase: 12.25,
        stockActual: 18,
        disponible: true,
        imagenPrincipal: '/productos/p7.jpg',
        color: colores[8]
      }
    ]
  },
  // 8. Katia Bambini (lana infantil suave)
  {
    id: 8,
    nombre: 'Katia Bambini',
    slug: 'katia-bambini',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana suave para prendas de bebé y niño',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 8,
        productoId: 8,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 125,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '100% Lana Merino Superwash',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 8,
        varianteId: 8,
        colorId: 7,
        sku: 'KAT-BAM-DK-ROS-001',
        precioBase: 5.25,
        stockActual: 25,
        disponible: true,
        imagenPrincipal: '/productos/p8.jpg',
        color: colores[6]
      }
    ]
  },
  // 9. Katia Ingenua (lana mohair ligera)
  {
    id: 9,
    nombre: 'Katia Ingenua',
    slug: 'katia-ingenua',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Mohair ligero y esponjoso para prendas vaporosas',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 9,
        productoId: 9,
        nombreVariante: 'Lace Weight',
        pesoOvillo: 25,
        metrosOvillo: 200,
        agujaRecomendadaMin: 3.0,
        agujaRecomendadaMax: 3.5,
        grosor: 'Lace',
        composicion: '72% Mohair, 28% Seda',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 9,
        varianteId: 9,
        colorId: 8,
        sku: 'KAT-ING-LAC-VIO-001',
        precioBase: 9.90,
        stockActual: 12,
        disponible: true,
        imagenPrincipal: '/productos/p9.jpg',
        color: colores[7]
      }
    ]
  },
  // 10. Katia Mammy (lana para proyectos grandes)
  {
    id: 10,
    nombre: 'Katia Mammy',
    slug: 'katia-mammy',
    marcaId: 1,
    categoriaId: 2,
    descripcionCorta: 'Ovillos XL ideales para mantas y jerséis oversize',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[1],
    variantes: [
      {
        id: 10,
        productoId: 10,
        nombreVariante: 'XL Chunky',
        pesoOvillo: 500,
        metrosOvillo: 200,
        agujaRecomendadaMin: 8.0,
        agujaRecomendadaMax: 10.0,
        grosor: 'Chunky',
        composicion: '100% Acrílico',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 10,
        varianteId: 10,
        colorId: 6,
        sku: 'KAT-MAM-CHU-NEG-001',
        precioBase: 16.75,
        stockActual: 8,
        disponible: true,
        imagenPrincipal: '/productos/p10.jpg',
        color: colores[5]
      }
    ]
  },
  // 11. Katia Merino Baby
  {
    id: 11,
    nombre: 'Katia Merino Baby',
    slug: 'katia-merino-baby',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Merino extrafino ideal para prendas de bebé',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 11,
        productoId: 11,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 155,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '100% Lana Merino Extrafina',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 11,
        varianteId: 11,
        colorId: 4,
        sku: 'KAT-MER-BAB-AMA-001',
        precioBase: 4.25,
        stockActual: 32,
        disponible: true,
        imagenPrincipal: '/productos/p11.jpg',
        color: colores[3]
      }
    ]
  },
  // 12. Katia Merino Aran Sunrise (lana jaspeada)
  {
    id: 12,
    nombre: 'Katia Merino Aran Sunrise',
    slug: 'katia-merino-aran-sunrise',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Ovillo merino con efecto degradado Sunrise',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 12,
        productoId: 12,
        nombreVariante: 'Aran Weight',
        pesoOvillo: 100,
        metrosOvillo: 155,
        agujaRecomendadaMin: 5.0,
        agujaRecomendadaMax: 5.5,
        grosor: 'Aran',
        composicion: '100% Lana Merino',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 12,
        varianteId: 12,
        colorId: 7,
        sku: 'KAT-MER-ARA-SUN-ROS-001',
        precioBase: 18.90,
        stockActual: 14,
        disponible: true,
        imagenPrincipal: '/productos/p12.jpg',
        color: colores[6]
      }
    ]
  },
  // 13. Katia Merino Aran
  {
    id: 13,
    nombre: 'Katia Merino Aran',
    slug: 'katia-merino-aran',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana merino aran versátil y resistente',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 13,
        productoId: 13,
        nombreVariante: 'Aran Weight',
        pesoOvillo: 100,
        metrosOvillo: 170,
        agujaRecomendadaMin: 5.0,
        agujaRecomendadaMax: 5.5,
        grosor: 'Aran',
        composicion: '100% Lana Merino',
        temporada: 'Otoño/Invierno',
        activa: true
      }
    ],
    colores: [
      {
        id: 13,
        varianteId: 13,
        colorId: 1,
        sku: 'KAT-MER-ARA-ROJ-001',
        precioBase: 10.50,
        stockActual: 20,
        disponible: true,
        imagenPrincipal: '/productos/p13.jpg',
        color: colores[0]
      }
    ]
  },
  // 14. Katia Capri (algodón mercerizado)
  {
    id: 14,
    nombre: 'Katia Capri',
    slug: 'katia-capri',
    marcaId: 1,
    categoriaId: 3,
    descripcionCorta: 'Algodón mercerizado suave, ideal para prendas frescas',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[2],
    variantes: [
      {
        id: 14,
        productoId: 14,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 140,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '100% Algodón Mercerizado',
        temporada: 'Primavera/Verano',
        activa: true
      }
    ],
    colores: [
      {
        id: 14,
        varianteId: 14,
        colorId: 8,
        sku: 'KAT-CAP-DK-VIO-001',
        precioBase: 8.25,
        stockActual: 22,
        disponible: true,
        imagenPrincipal: '/productos/p14.jpg',
        color: colores[7]
      }
    ]
  },
  // 15. Katia Sherpa (lana efecto borreguito)
  {
    id: 15,
    nombre: 'Katia Sherpa',
    slug: 'katia-sherpa',
    marcaId: 1,
    categoriaId: 2,
    descripcionCorta: 'Lana efecto sherpa muy cálida para abrigos y complementos',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[1],
    variantes: [
      {
        id: 15,
        productoId: 15,
        nombreVariante: 'Bulky Weight',
        pesoOvillo: 100,
        metrosOvillo: 115,
        agujaRecomendadaMin: 6.0,
        agujaRecomendadaMax: 8.0,
        grosor: 'Bulky',
        composicion: '100% Poliéster',
        temporada: 'Otoño/Invierno',
        activa: true
      }
    ],
    colores: [
      {
        id: 15,
        varianteId: 15,
        colorId: 5,
        sku: 'KAT-SHE-BUL-BLA-001',
        precioBase: 9.25,
        stockActual: 18,
        disponible: true,
        imagenPrincipal: '/productos/p15.jpg',
        color: colores[4]
      }
    ]
  }
];

// Utilidades
export const getProductosPorCategoria = (categoriaId?: number) => {
  if (!categoriaId) return productos;
  return productos.filter(p => p.categoriaId === categoriaId);
};

export const getProductosPorTipo = (tipoId?: number) => {
  if (!tipoId) return productos;
  return productos.filter(p => p.categoria.tipoId === tipoId);
};

export const getProductosDestacados = () => {
  return productos.filter(p => p.destacado);
};

export const getProductosEnPantalla = () => {
  return productos.filter(p => p.enPantalla);
};