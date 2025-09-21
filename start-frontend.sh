#!/bin/bash

echo "⚛️  Iniciando Frontend Next.js - Doña Araña"
echo "==========================================="

cd /home/javier/tienda2025/frontend

echo "📋 Verificando Node.js..."
node -v
npm -v

echo ""
echo "📦 Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "🔧 Instalando dependencias..."
    npm install
fi

echo ""
echo "✅ Dependencias listas!"
echo "🚀 Iniciando servidor Next.js en puerto 3000..."
echo "🌐 Aplicación estará disponible en: http://localhost:3000"
echo "🛑 Presiona Ctrl+C para detener"
echo ""

npm run dev