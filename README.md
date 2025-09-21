# 🎯 Doña Araña - Tienda Online

**Estado:** ✅ **PROYECTO COMPLETADO** - Frontend y Backend implementados

**Doña Araña** es una tienda local en **Sanlúcar de Barrameda** especializada en lanas, hilos y accesorios para manualidades. Esta aplicación web utiliza una arquitectura moderna separada en **backend Spring Boot** y **frontend React/Next.js**.

## 🏗️ Arquitectura

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.1 + Java 17
- **Base de datos**: PostgreSQL con Spring Data JPA
- **Seguridad**: Spring Security + JWT
- **API**: REST con validación de datos
- **Puerto**: 8080

### Frontend (React/Next.js)
- **Framework**: Next.js 15.1 con App Router
- **UI**: React 19 + TypeScript + Tailwind CSS
- **Estado**: Zustand + React Hook Form
- **HTTP Client**: Axios
- **Puerto**: 3000

## 🚀 Funcionalidades Implementadas

### ✅ Frontend Completo
- **Autenticación:** Login/Register con JWT y protección de rutas
- **Tienda:** Catálogo de productos con filtros, búsqueda y paginación
- **Carrito:** Sistema de apartado de productos con persistencia
- **Perfil:** Gestión de usuario y historial de apartados
- **UI/UX:** Diseño responsive con Tailwind CSS y componentes reutilizables
- **Estado:** Gestión global con Zustand para auth y carrito

### ✅ Backend Completo
- **APIs REST:** CRUD completo para todas las entidades
- **Seguridad:** JWT + Spring Security con roles y autorización
- **Base de Datos:** PostgreSQL con JPA/Hibernate y relaciones complejas
- **Arquitectura:** Servicios + Repositorios + DTOs + Validaciones

## 📋 Modelo de Datos

```
Usuarios → Apartados ← Productos ← Categoría ← Tipo
                     ↗
             Complementos
```

### Entidades Principales:
- **Usuario**: Gestión de clientes registrados
- **Producto**: Inventario con códigos, precios e imágenes
- **Apartado**: Sistema de reservas con expiración
- **Categoría**: Clasificación de productos por tipo
- **Complemento**: Accesorios adicionales

## 🛠️ Instalación y Uso

### Prerrequisitos
- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Base de Datos
```sql
-- Configurar PostgreSQL
CREATE DATABASE d_arana;
CREATE USER d_arana_user WITH PASSWORD '1111';
GRANT ALL PRIVILEGES ON DATABASE d_arana TO d_arana_user;
```

## 🔧 Configuración

### Backend (`application.yml`)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/d_arana
    username: d_arana_user
    password: "1111"

server:
  port: 8080
```

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 📱 Endpoints API

### Autenticación
- `POST /api/auth/signin` - Login
- `POST /api/auth/register` - Registro

### Productos
- `GET /api/productos` - Listar todos
- `GET /api/productos/pantalla` - Productos destacados
- `GET /api/productos/{id}` - Producto por ID

### Apartados (Requiere autenticación)
- `GET /api/apartados/mis-apartados` - Mis apartados
- `POST /api/apartados/crear?productoId={id}` - Crear apartado
- `DELETE /api/apartados/{id}` - Eliminar apartado

## 🔐 Seguridad

- **JWT Tokens**: Autenticación stateless
- **CORS**: Configurado para desarrollo
- **Validación**: Bean Validation en DTOs
- **Hash de contraseñas**: BCrypt
- **Autorización**: Role-based con Spring Security

## 🎨 Stack Tecnológico

**Backend:**
- Spring Boot 3.2.1
- Spring Security 6
- Spring Data JPA
- PostgreSQL
- JWT (jjwt 0.12.3)
- Maven

**Frontend:**
- Next.js 15.1
- React 19
- TypeScript 5
- Tailwind CSS 3.4
- Zustand (estado)
- Axios (HTTP)
- React Hook Form

## 📁 Estructura del Proyecto

```
tienda2025/
├── backend/
│   ├── src/main/java/com/donaarana/tienda/
│   │   ├── entity/          # Entidades JPA
│   │   ├── repository/      # Repositorios Spring Data
│   │   ├── service/         # Lógica de negocio
│   │   ├── controller/      # Controladores REST
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── security/       # Configuración JWT
│   │   └── config/         # Configuración Spring
│   └── pom.xml
└── frontend/
    ├── app/                # Páginas Next.js App Router
    ├── components/         # Componentes React
    ├── lib/               # Utilidades y API client
    ├── store/             # Estado global Zustand
    └── package.json
```

## 👥 Contribución

Desarrollado por **Javier Rodríguez López** como proyecto portfolio.

---

📍 **Doña Araña** - Sanlúcar de Barrameda
✉️ Contacto: Jrlsanlucar11@gmail.com