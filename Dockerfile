# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Instala bash y Maven
RUN apk add --no-cache bash maven

# Copia pom.xml primero para cache de dependencias
COPY backend/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# Copia código fuente
COPY backend/src ./src

# Compila la aplicación
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Copia script de inicio
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Comando de inicio
CMD ["./start.sh"]
