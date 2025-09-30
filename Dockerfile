# =========================
# Stage 1: Build
# =========================
FROM eclipse-temurin:21-jdk-alpine AS build

# Working directory
WORKDIR /app

# Instala bash, Maven y certificados SSL para descargas HTTPS
RUN apk add --no-cache bash maven ca-certificates

# Copia solo pom.xml primero para cache de dependencias
COPY backend/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# Copia solo el código fuente
COPY backend/src ./src

# Compila el proyecto y genera el JAR
RUN mvn clean package -DskipTests -B

# =========================
# Stage 2: Runtime
# =========================
FROM eclipse-temurin:21-jre-alpine

# Working directory
WORKDIR /app

# Copia el JAR generado desde el stage build
COPY --from=build /app/target/*.jar app.jar

# Copia el script de inicio
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Comando de inicio
CMD ["./start.sh"]
