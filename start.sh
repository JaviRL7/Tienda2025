#!/bin/bash

echo "🚀 Iniciando Spring Boot..."

# Verificar que existe app.jar
if [ ! -f app.jar ]; then
    echo "❌ Error: app.jar no encontrado"
    ls -la
    exit 1
fi

echo "📦 Ejecutando app.jar"

# Ejecutar con configuraciones optimizadas para Railway
exec java \
    -server \
    -Xmx512m \
    -XX:+UseG1GC \
    -XX:+UseStringDeduplication \
    -Djava.security.egd=file:/dev/./urandom \
    -jar app.jar
