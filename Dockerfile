# =========================
# Stage 1: Build
# =========================
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache bash maven ca-certificates

# Copiar solo pom.xml primero para aprovechar cache de Docker
COPY backend/pom.xml ./pom.xml

# Descargar dependencias (layer cacheable)
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY backend/src ./src

# Compilar aplicación
RUN mvn clean package -DskipTests -B

# =========================
# Stage 2: Runtime
# =========================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Instalar bash para el script de inicio
RUN apk add --no-cache bash

# Copiar JAR desde build stage con nombre fijo
COPY --from=build /app/target/*.jar app.jar

# Copiar y hacer ejecutable el script de inicio
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Usar script de inicio
CMD ["./start.sh"]
