# Multi-stage build para optimizar tamaño y tiempo de construcción
FROM maven:3.9.4-eclipse-temurin-21-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración Maven
COPY pom.xml .

# Descargar dependencias (layer cacheable)
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Construir aplicación
RUN mvn clean package -DskipTests -B --no-transfer-progress

# Stage final - runtime
FROM eclipse-temurin:21-jre-alpine

# Crear usuario no-root
RUN addgroup -g 1001 -S spring && \
    adduser -S spring -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar JAR desde build stage
COPY --from=build /app/target/*.jar app.jar

# Cambiar propietario de archivos
RUN chown spring:spring app.jar

# Cambiar a usuario no-root
USER spring

# Exponer puerto
EXPOSE 8080

# Comando de inicio optimizado para Railway
CMD ["java", "-server", "-Xmx512m", "-XX:+UseG1GC", "-XX:+UseStringDeduplication", "-jar", "app.jar"]