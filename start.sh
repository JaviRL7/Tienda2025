#!/bin/bash

# Script de inicio para Railway - Tienda Doña Araña
echo "🚀 Iniciando aplicación Spring Boot..."

# Encontrar el JAR en el directorio target
JAR_FILE=$(find target -name "*.jar" -type f | head -n 1)

if [ -z "$JAR_FILE" ]; then
    echo "❌ Error: No se encontró ningún archivo JAR en target/"
    exit 1
fi

echo "📦 JAR encontrado: $JAR_FILE"

# Ejecutar la aplicación con configuraciones optimizadas para Railway
echo "🔥 Ejecutando aplicación..."
exec java -server \
    -Xmx512m \
    -XX:+UseG1GC \
    -XX:+UseStringDeduplication \
    -Djava.security.egd=file:/dev/./urandom \
    -jar "$JAR_FILE"