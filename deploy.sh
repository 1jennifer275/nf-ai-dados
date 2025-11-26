#!/bin/bash

echo "🚀 Script de Deploy - NF-AI Dados"
echo "=================================="
echo ""

if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositório Git..."
    git init
    git branch -M main
    echo "✅ Git inicializado!"
else
    echo "✅ Repositório Git já existe"
fi

echo ""
echo "📝 Adicionando arquivos..."
git add .

echo ""
echo "💾 Criando commit..."
git commit -m "Deploy: Sistema NF-AI completo"

echo ""
echo "✅ Pronto para enviar ao GitHub!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie um repositório no GitHub: https://github.com/new"
echo "2. Execute os comandos:"
echo ""
echo "   git remote add origin https://github.com/SEU_USUARIO/nf-ai-dados.git"
echo "   git push -u origin main"
echo ""
echo "3. Acesse Render.com e conecte o repositório"
echo ""
echo "📖 Guia completo: DEPLOY_RENDER.md"

