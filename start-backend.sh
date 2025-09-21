#!/bin/bash

echo "🚀 Iniciando Backend Spring Boot - Doña Araña"
echo "=============================================="

cd /home/javier/tienda2025/backend

echo "📋 Verificando Java..."
java -version

echo ""
echo "🔧 Compilando proyecto..."
mvn clean compile

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Compilación exitosa!"
    echo "🚀 Iniciando servidor Spring Boot en puerto 8080..."
    echo "💡 API estará disponible en: http://localhost:8080/api"
    echo "🛑 Presiona Ctrl+C para detener"
    echo ""
    mvn spring-boot:run
else
    echo ""
    echo "❌ Error en la compilación"
    echo "💡 Verifica que Java esté correctamente configurado"
fi