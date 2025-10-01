-- Seeder para etiquetas de galería
-- Este archivo se ejecuta automáticamente al iniciar Spring Boot

-- Insertar etiquetas (usar ON CONFLICT para evitar duplicados)
INSERT INTO etiquetas (nombre, descripcion, color, activa, total_usos) VALUES
('manualidades', 'Trabajos de manualidades', '#28a745', true, 0),
('tienda', 'Productos de la tienda', '#17a2b8', true, 0),
('taller', 'Imágenes del taller', '#ffc107', true, 0)
ON CONFLICT (nombre) DO NOTHING;

-- Asignar etiquetas a las imágenes de galería
-- Esto usa los nombres de las imágenes para ser independiente de los IDs
INSERT INTO galeria_etiquetas (galeria_id, etiqueta_id)
SELECT g.id, e.id
FROM galeria g, etiquetas e
WHERE g.nombre IN ('Galería 1', 'Galería 2', 'Galería 3', 'Galería 4')
  AND e.nombre = 'manualidades'
  AND NOT EXISTS (
    SELECT 1 FROM galeria_etiquetas ge
    WHERE ge.galeria_id = g.id AND ge.etiqueta_id = e.id
  )

UNION ALL

SELECT g.id, e.id
FROM galeria g, etiquetas e
WHERE g.nombre IN ('Galería 5', 'Galería 6', 'Galería 7', 'Galería 8')
  AND e.nombre = 'tienda'
  AND NOT EXISTS (
    SELECT 1 FROM galeria_etiquetas ge
    WHERE ge.galeria_id = g.id AND ge.etiqueta_id = e.id
  )

UNION ALL

SELECT g.id, e.id
FROM galeria g, etiquetas e
WHERE g.nombre IN ('Galería 9', 'Galería 10', 'Galería 11', 'Galería 12')
  AND e.nombre = 'taller'
  AND NOT EXISTS (
    SELECT 1 FROM galeria_etiquetas ge
    WHERE ge.galeria_id = g.id AND ge.etiqueta_id = e.id
  );

-- Actualizar contadores de uso
UPDATE etiquetas SET total_usos = (
  SELECT COUNT(*) FROM galeria_etiquetas WHERE etiqueta_id = etiquetas.id
);
