#!/bin/bash

# Script de lancement du serveur PWA iPad
# Auteur: Vincent Cavez
# Date: $(date +%Y-%m-%d)

echo "🚀 Démarrage du serveur PWA iPad..."
echo "📱 Application accessible sur iPad à l'adresse:"

# Obtenir l'adresse IP locale
IP=$(ifconfig | grep -E "inet (192\.168\.|10\.)" | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -n "$IP" ]; then
    echo "   http://$IP:8000"
    echo ""
    echo "💡 Copiez cette adresse dans Safari sur votre iPad"
else
    echo "   http://localhost:8000"
    echo ""
    echo "⚠️  Impossible de déterminer l'IP locale - utilisez localhost"
fi

echo ""
echo "🛑 Pour arrêter le serveur, appuyez sur Ctrl+C"
echo "=================================================="
echo ""

# Aller dans le répertoire du script
cd "$(dirname "$0")"

# Lancer le serveur Python
echo "🔄 Lancement du serveur sur le port 8000..."
python3 -m http.server 8000 --bind 0.0.0.0 