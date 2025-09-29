#!/bin/bash

# Script para ejecutar Spring Boot con diferentes perfiles
# Uso: ./run-with-profile.sh [dev|local|prod]

PROFILE=${1:-dev}

echo "🚀 Iniciando Spring Boot con perfil: $PROFILE"

case $PROFILE in
  "dev")
    echo "📍 Usando PostgreSQL local (localhost:5432)"
    ;;
  "local")
    echo "📍 Usando Railway PostgreSQL público (para desarrollo desde PC)"
    echo "⚠️  Asegúrate de tener RAILWAY_DB_PASSWORD configurado"
    ;;
  "prod")
    echo "📍 Usando Railway PostgreSQL interno (para producción)"
    echo "⚠️  Asegúrate de tener DATABASE_URL configurado"
    ;;
  *)
    echo "❌ Perfil inválido. Usa: dev, local, o prod"
    exit 1
    ;;
esac

export SPRING_PROFILES_ACTIVE=$PROFILE
mvn spring-boot:run -Dspring-boot.run.profiles=$PROFILE