#!/bin/bash

if [ ! -f app.jar ]; then
  echo "❌ Error: app.jar no encontrado"
  exit 1
fi

echo "🚀 Iniciando Spring Boot..."
exec java -server -Xmx512m -XX:+UseG1GC -XX:+UseStringDeduplication -jar app.jar
