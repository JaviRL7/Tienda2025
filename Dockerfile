# Multi-stage build for Railway deployment
FROM maven:3.9.4-eclipse-temurin-21-alpine AS build

# Set working directory
WORKDIR /app

# Copy backend pom.xml first for dependency caching
COPY backend/pom.xml .

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy backend source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage with specific name
COPY --from=build /app/target/tienda-backend-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-server", "-Xmx512m", "-XX:+UseG1GC", "-jar", "app.jar"]