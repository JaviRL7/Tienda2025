# Doña Araña - Tienda Online

Aplicación web completa para la tienda **Doña Araña** de Sanlúcar de Barrameda, especializada en la venta de lanas, hilos y accesorios para manualidades.

![Captura 1](./frontend/public/nuevo%20DA/D1.jfif)
![Captura 2](./frontend/public/nuevo%20DA/D2.jfif)

## Sobre el Proyecto

Este proyecto nace de la necesidad de digitalizar una tienda local familiar, permitiendo a sus clientes explorar el catálogo de productos, gestionar apartados y mantenerse conectados con el negocio a través de una plataforma web moderna y accesible.

La aplicación está construida con tecnologías actuales, separando claramente el backend (API REST en Java) del frontend (interfaz web en React), lo que permite escalabilidad y mantenimiento sencillo a largo plazo.

## Características Principales

### Para los Clientes
- **Catálogo interactivo** con búsqueda y filtros por categorías y tipos de producto
- **Sistema de apartados** que permite reservar productos temporalmente
- **Gestión de perfil** donde ver el historial de apartados realizados
- **Galería de trabajos** organizada por etiquetas (manualidades, tienda, taller)
- **Sistema de reseñas** para valorar la tienda y compartir experiencias
- **Diseño responsive** adaptado a móviles, tablets y escritorio

### Para el Negocio
- Panel de administración para gestionar productos, categorías y complementos
- Control de stock y visibilidad de productos en pantalla
- Gestión de usuarios registrados
- Administración de la galería de imágenes con etiquetas
- Sistema de apartados con fecha de expiración automática

![Captura 3](./frontend/public/nuevo%20DA/D3.jfif)

## Arquitectura y Tecnologías

El proyecto está dividido en dos aplicaciones independientes que se comunican mediante API REST:

### Backend - API REST
Desarrollado en **Java 17** con **Spring Boot 3**, proporciona todos los servicios necesarios:

- **Spring Data JPA** para el acceso a la base de datos PostgreSQL
- **Spring Security** con autenticación JWT para proteger endpoints
- **Hibernate** como ORM para mapear las entidades
- **Maven** como gestor de dependencias
- Arquitectura en capas: Controllers → Services → Repositories

### Frontend - Aplicación Web
Construido con **Next.js 15** y **React 19**, ofrece una experiencia de usuario fluida:

- **TypeScript** para mayor seguridad en el código
- **Tailwind CSS** para estilos modernos y responsive
- **Zustand** como gestor de estado global
- **Axios** para las peticiones HTTP al backend
- **React Hook Form** para validación de formularios
- **Framer Motion** para animaciones suaves

### Base de Datos
**PostgreSQL** como sistema gestor, con un modelo relacional completo:

- Usuarios y sistema de autenticación
- Productos con categorías y tipos jerárquicos
- Apartados con fechas de expiración
- Complementos asociados a productos
- Galería de imágenes con sistema de etiquetas
- Reseñas con valoración y comentarios

![Captura 4](./frontend/public/nuevo%20DA/D4.jfif)

**Demo en producción:** https://pure-gratitude-production-4381.up.railway.app/

## Instalación Local

### Requisitos Previos
- Java 17 o superior
- Node.js 18 o superior
- PostgreSQL 14 o superior
- Maven 3.8 o superior

### 1. Configurar la Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos y usuario
CREATE DATABASE tienda_dona_arana;
CREATE USER d_arana_user WITH PASSWORD '1111';
GRANT ALL PRIVILEGES ON DATABASE tienda_dona_arana TO d_arana_user;
```

### 2. Configurar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Compilar y ejecutar
mvn spring-boot:run
```

El backend se ejecutará en `http://localhost:8080`

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend se ejecutará en `http://localhost:3000`

### 4. Variables de Entorno

**Backend** (`backend/src/main/resources/application-local.yml`):
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tienda_dona_arana
    username: d_arana_user
    password: "1111"
```

**Frontend** (crear archivo `frontend/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Estructura del Código

```
tienda2025/
│
├── backend/                          # Aplicación Spring Boot
│   ├── src/main/java/
│   │   └── com/donaarana/tienda/
│   │       ├── config/              # Configuración (CORS, seguridad, seeders)
│   │       ├── controller/          # Controladores REST
│   │       ├── dto/                 # Objetos de transferencia de datos
│   │       ├── entity/              # Entidades JPA (Producto, Usuario, etc)
│   │       ├── repository/          # Repositorios Spring Data
│   │       ├── security/            # JWT y seguridad
│   │       └── service/             # Lógica de negocio
│   └── src/main/resources/
│       ├── application.yml          # Configuración general
│       └── data.sql                 # Datos iniciales
│
└── frontend/                         # Aplicación Next.js
    ├── app/                         # Páginas y rutas (App Router)
    │   ├── galeria/                # Vista de galería
    │   ├── tienda/                 # Catálogo de productos
    │   ├── perfil/                 # Perfil de usuario
    │   └── auth/                   # Login y registro
    ├── components/                  # Componentes reutilizables
    │   ├── cart/                   # Carrito de apartados
    │   ├── layout/                 # Layouts y navegación
    │   └── ui/                     # Componentes UI básicos
    ├── lib/                        # Utilidades y cliente API
    ├── store/                      # Estado global (Zustand)
    └── public/                     # Recursos estáticos (imágenes)
```

## API Endpoints

### Autenticación
- `POST /api/auth/signin` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo usuario

### Productos (Público)
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/pantalla` - Productos destacados
- `GET /api/productos/{id}` - Detalle de un producto
- `GET /api/productos/buscar?codigo={codigo}` - Buscar por código

### Apartados (Requiere autenticación)
- `GET /api/apartados/mis-apartados` - Mis apartados activos
- `POST /api/apartados/crear?productoId={id}` - Crear nuevo apartado
- `DELETE /api/apartados/{id}` - Eliminar apartado
- `GET /api/apartados/verificar/{productoId}` - Verificar si existe apartado

### Galería (Público)
- `GET /api/management/galeria` - Todas las imágenes
- `GET /api/management/galeria/etiquetas` - Etiquetas disponibles
- `GET /api/management/galeria/etiqueta/{nombre}` - Imágenes por etiqueta

### Reseñas
- `GET /api/resenas` - Listar reseñas con paginación
- `POST /api/resenas` - Crear reseña (requiere autenticación)
- `GET /api/resenas/mis-resenas` - Mis reseñas (requiere autenticación)

## Seguridad

La aplicación implementa múltiples capas de seguridad:

- **Autenticación JWT**: Los tokens se generan al iniciar sesión y tienen validez limitada
- **Encriptación BCrypt**: Las contraseñas nunca se almacenan en texto plano
- **CORS configurado**: Solo los orígenes autorizados pueden acceder a la API
- **Validación de datos**: Todos los inputs se validan tanto en frontend como backend
- **Protección de rutas**: Páginas privadas solo accesibles con autenticación válida

## Despliegue en Producción

El proyecto está preparado para desplegarse en **Railway** con configuración automática:

**Backend**:
- Utiliza el perfil `prod` automáticamente
- Variables de entorno configuradas en Railway (PGHOST, PGPORT, PGDATABASE, etc)
- Puerto dinámico mediante variable `PORT`

**Frontend**:
- Build optimizado con Next.js
- Variable `NEXT_PUBLIC_API_URL` apuntando al backend de producción
- Imágenes servidas desde el frontend

## Características Técnicas Destacadas

### Backend
- Arquitectura limpia con separación de responsabilidades
- Seeders automáticos para datos iniciales (etiquetas, galería)
- Manejo de relaciones complejas Many-to-Many (Galería-Etiquetas)
- Sistema de apartados con lógica de expiración
- Contadores automáticos (total de usos en etiquetas)

### Frontend
- Server Components y Client Components de Next.js 15
- Optimización de imágenes con next/image
- Estados globales con Zustand (auth, carrito)
- Animaciones fluidas con Framer Motion
- Sistema de notificaciones toast
- Carga lazy de componentes

## Desarrollo

Este proyecto fue desarrollado íntegramente por **Javier Rodríguez López** como parte de su portfolio profesional, aplicando las mejores prácticas de desarrollo web moderno y metodologías ágiles.

### Metodología de Trabajo
- Control de versiones con Git
- Commits descriptivos siguiendo convenciones
- Desarrollo iterativo con testing continuo
- Documentación del código
- Refactorización constante

## Contacto

**Doña Araña** - Tienda de Lanas y Manualidades
Sanlúcar de Barrameda, Cádiz
Correo: Jrlsanlucar11@gmail.com
Instagram: [@dona_arana_sanlucar](https://www.instagram.com/dona_arana_sanlucar/)

---

**Desarrollado por Javier Rodríguez López**
