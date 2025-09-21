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
        id: 7,
        varianteId: 8,
        colorId: 7,
        sku: 'KAT-BAM-DK-ROS-001',
        precioBase: 5.25,
        stockActual: 25,
        disponible: true,
        imagenPrincipal: '/productos/p8.jpg',
        color: colores[6]
      },
      {
        id: 8,
        varianteId: 8,
        colorId: 2,
        sku: 'KAT-BAM-DK-AZU-001',
        precioBase: 5.25,
        stockActual: 22,
        disponible: true,
        imagenPrincipal: '/productos/p8.jpg',
        color: colores[1]
      }
    ]
  },
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
  {
    id: 7,
    nombre: 'Katia Azteca',
    slug: 'katia-azteca',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Hilo multicolor con degradados únicos',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 7,
        productoId: 7,
        nombreVariante: 'Worsted Weight',
        pesoOvillo: 100,
        metrosOvillo: 250,
        agujaRecomendadaMin: 4.5,
        agujaRecomendadaMax: 5.0,
        grosor: 'Worsted',
        composicion: '45% Lana, 35% Acrílico, 20% Poliamida',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 11,
        varianteId: 7,
        colorId: 9,
        sku: 'KAT-AZT-WOR-NAR-001',
        precioBase: 12.25,
        stockActual: 18,
        disponible: true,
        imagenPrincipal: '/productos/p7.jpg',
        color: colores[8]
      }
    ]
  },
  {
    id: 9,
    nombre: 'Katia Luxury Soft',
    slug: 'katia-luxury-soft',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana premium extra suave al tacto',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 9,
        productoId: 9,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 120,
        agujaRecomendadaMin: 4.0,
        agujaRecomendadaMax: 4.5,
        grosor: 'DK',
        composicion: '100% Lana Merino Extrafina',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 12,
        varianteId: 9,
        colorId: 10,
        sku: 'KAT-LUX-DK-GRI-001',
        precioBase: 7.50,
        stockActual: 28,
        disponible: true,
        imagenPrincipal: '/productos/p9.jpg',
        color: colores[9]
      }
    ]
  },
  {
    id: 10,
    nombre: 'Katia Mohair',
    slug: 'katia-mohair',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Fibra mohair para texturas especiales',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 10,
        productoId: 10,
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
        id: 15,
        varianteId: 10,
        colorId: 8,
        sku: 'KAT-MOH-LAC-VIO-001',
        precioBase: 9.90,
        stockActual: 12,
        disponible: true,
        imagenPrincipal: '/productos/p10.jpg',
        color: colores[7]
      }
    ]
  },
  {
    id: 11,
    nombre: 'Katia Concept Cotton-Cashmere',
    slug: 'katia-concept-cotton-cashmere',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Mezcla luxury de algodón y cashmere',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 11,
        productoId: 11,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 130,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '85% Algodón, 15% Cashmere',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 16,
        varianteId: 11,
        colorId: 6,
        sku: 'KAT-CON-DK-NEG-001',
        precioBase: 16.75,
        stockActual: 8,
        disponible: true,
        imagenPrincipal: '/productos/p11.jpg',
        color: colores[5]
      }
    ]
  },
  {
    id: 12,
    nombre: 'Katia Fair Cotton',
    slug: 'katia-fair-cotton',
    marcaId: 1,
    categoriaId: 4,
    descripcionCorta: 'Algodón orgánico de comercio justo',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[3],
    variantes: [
      {
        id: 12,
        productoId: 12,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 155,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'DK',
        composicion: '100% Algodón Orgánico',
        temporada: 'Primavera/Verano',
        activa: true
      }
    ],
    colores: [
      {
        id: 17,
        varianteId: 12,
        colorId: 4,
        sku: 'KAT-FAI-DK-AMA-001',
        precioBase: 4.25,
        stockActual: 32,
        disponible: true,
        imagenPrincipal: '/productos/p12.jpg',
        color: colores[3]
      }
    ]
  },
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
      },
      {
        id: 14,
        varianteId: 13,
        colorId: 2,
        sku: 'KAT-MER-ARA-AZU-001',
        precioBase: 10.50,
        stockActual: 18,
        disponible: true,
        imagenPrincipal: '/productos/p13.jpg',
        color: colores[1]
      }
    ]
  },
  {
    id: 14,
    nombre: 'Katia Silk-Alpaca',
    slug: 'katia-silk-alpaca',
    marcaId: 1,
    categoriaId: 5,
    descripcionCorta: 'Mezcla premium de seda y alpaca',
    activo: true,
    destacado: false,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[4],
    variantes: [
      {
        id: 14,
        productoId: 14,
        nombreVariante: 'Sport Weight',
        pesoOvillo: 50,
        metrosOvillo: 140,
        agujaRecomendadaMin: 3.5,
        agujaRecomendadaMax: 4.0,
        grosor: 'Sport',
        composicion: '70% Alpaca, 30% Seda',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 18,
        varianteId: 14,
        colorId: 7,
        sku: 'KAT-SIL-SPO-ROS-001',
        precioBase: 18.90,
        stockActual: 14,
        disponible: true,
        imagenPrincipal: '/productos/p14.jpg',
        color: colores[6]
      }
    ]
  },
  {
    id: 15,
    nombre: 'Katia Ultrasoft',
    slug: 'katia-ultrasoft',
    marcaId: 1,
    categoriaId: 1,
    descripcionCorta: 'Lana ultra suave para prendas delicadas',
    activo: true,
    destacado: true,
    enPantalla: true,
    marca: marcas[0],
    categoria: categorias[0],
    variantes: [
      {
        id: 15,
        productoId: 15,
        nombreVariante: 'DK Weight',
        pesoOvillo: 50,
        metrosOvillo: 115,
        agujaRecomendadaMin: 4.0,
        agujaRecomendadaMax: 4.5,
        grosor: 'DK',
        composicion: '100% Lana Merino Superwash',
        temporada: 'Todo el año',
        activa: true
      }
    ],
    colores: [
      {
        id: 19,
        varianteId: 15,
        colorId: 8,
        sku: 'KAT-ULT-DK-VIO-001',
        precioBase: 8.25,
        stockActual: 22,
        disponible: true,
        imagenPrincipal: '/productos/p15.jpg',
        color: colores[7]
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