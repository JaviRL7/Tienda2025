#!/bin/bash
cd /home/javier/tienda2025/backend
export JAVA_HOME=/usr/lib/jvm/java-1.21.0-openjdk-amd64
echo "=== Compilando Backend ==="
mvn clean compile -X
echo "=== Ejecutando Backend ==="
mvn spring-boot:run