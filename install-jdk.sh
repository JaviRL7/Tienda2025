#!/bin/bash

echo "🔧 Instalando OpenJDK 17 (requerido para Spring Boot)"
echo "=================================================="

# Descargar y instalar OpenJDK 17 sin sudo
echo "📥 Descargando OpenJDK 17..."
mkdir -p ~/jdk
cd ~/jdk

# Descargar Eclipse Temurin JDK 17 (funciona sin sudo)
wget -q https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.9%2B9/OpenJDK17U-jdk_x64_linux_hotspot_17.0.9_9.tar.gz

if [ $? -eq 0 ]; then
    echo "✅ Descarga completada"
    echo "📦 Extrayendo JDK..."

    tar -xzf OpenJDK17U-jdk_x64_linux_hotspot_17.0.9_9.tar.gz

    echo "🔧 Configurando variables de entorno..."
    export JAVA_HOME=~/jdk/jdk-17.0.9+9
    export PATH=$JAVA_HOME/bin:$PATH

    echo "✅ JDK 17 instalado en: $JAVA_HOME"
    echo "🔍 Verificando instalación..."

    $JAVA_HOME/bin/java -version
    $JAVA_HOME/bin/javac -version

    echo ""
    echo "🚀 Para usar en el backend:"
    echo "export JAVA_HOME=~/jdk/jdk-17.0.9+9"
    echo "export PATH=\$JAVA_HOME/bin:\$PATH"
    echo "cd backend && mvn spring-boot:run"

else
    echo "❌ Error descargando JDK"
    echo "💡 Alternativa: sudo apt install openjdk-17-jdk"
fi