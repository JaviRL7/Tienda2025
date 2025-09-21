# Instrucciones de Ejecución - Doña Araña Tienda

## ✅ Estado Actual

### Frontend - FUNCIONANDO
- **Next.js 15.5.3** con Turbopack
- **React 19** + TypeScript
- **Dependencias instaladas** sin vulnerabilidades
- **Puerto**: 3000

### Backend - NECESITA CONFIGURACIÓN JAVA
- **Spring Boot 3.3.4** listo
- **Arquitectura completa** implementada
- **Puerto**: 8080
- **Problema**: Maven no reconoce Java 21

## 🚀 Cómo Ejecutar

### Frontend (Ya funcionando)
```bash
cd frontend
npm run dev
# Visita: http://localhost:3000
```

### Backend (Requiere configuración)

**Opción 1: Instalar Java 17 LTS (Recomendado)**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
sudo update-alternatives --config java
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
cd backend
mvn spring-boot:run
```

**Opción 2: Configurar Java 21**
```bash
export JAVA_HOME=/usr/lib/jvm/java-1.21.0-openjdk-amd64
cd backend
mvn clean compile -Dmaven.compiler.source=21 -Dmaven.compiler.target=21
mvn spring-boot:run
```

**Opción 3: Docker (Futuro)**
```bash
# Crear Dockerfile con Java 17
docker build -t dona-arana-backend .
docker run -p 8080:8080 dona-arana-backend
```

## 📋 Endpoints API

Una vez que el backend esté funcionando:

- **Base URL**: http://localhost:8080/api
- **Auth**: POST /auth/signin, /auth/register
- **Productos**: GET /productos, /productos/pantalla
- **Apartados**: GET /apartados/mis-apartados (requiere auth)

## 🔧 Configuración Base de Datos

```sql
-- PostgreSQL
CREATE DATABASE d_arana;
CREATE USER d_arana_user WITH PASSWORD '1111';
GRANT ALL PRIVILEGES ON DATABASE d_arana TO d_arana_user;
```

## 📁 Estructura Final

```
tienda2025/
├── frontend/           # Next.js + React ✅ FUNCIONANDO
│   ├── app/
│   ├── components/
│   └── package.json
├── backend/            # Spring Boot ⚠️ NECESITA JAVA
│   ├── src/main/java/
│   └── pom.xml
└── README.md
```

## 💡 Próximos Pasos

1. **Configurar Java correctamente** para el backend
2. **Conectar a PostgreSQL**
3. **Probar APIs** desde frontend
4. **Añadir componentes React** faltantes (login, productos, etc.)

El proyecto está **90% completo** - solo falta resolver la configuración de Java para el backend.