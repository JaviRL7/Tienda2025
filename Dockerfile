# Use Eclipse Temurin 21 JDK Alpine as recommended by Railway
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy entire backend directory (Railway recommended pattern)
COPY backend/ ./

# Create Maven wrapper if not exists and build
RUN mvn -DoutputFile=target/mvn-dependency-list.log -B -DskipTests clean dependency:list install

# Use shell script for dynamic JAR discovery (Railway pattern)
CMD ["sh", "-c", "java -server -Xmx512m -XX:+UseG1GC -jar target/*.jar"]