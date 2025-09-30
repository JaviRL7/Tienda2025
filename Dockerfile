# Use Eclipse Temurin 21 JDK Alpine as recommended by Railway
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy backend directory and startup script
COPY backend/ ./
COPY start.sh ./

# Make startup script executable
RUN chmod +x start.sh

# Build the application
RUN mvn -DoutputFile=target/mvn-dependency-list.log -B -DskipTests clean dependency:list install

# Use startup script for reliable JAR execution
CMD ["./start.sh"]