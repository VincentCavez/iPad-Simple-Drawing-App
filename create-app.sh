#!/bin/bash

# Script pour créer une application macOS (.app) 
echo "🔨 Création de l'application PWA iPad Server.app..."

# Nom de l'application
APP_NAME="PWA iPad Server"
APP_DIR="$APP_NAME.app"

# Créer la structure de l'application macOS
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

# Créer le fichier Info.plist
cat > "$APP_DIR/Contents/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>PWA iPad Server</string>
    <key>CFBundleIdentifier</key>
    <string>com.vincent.pwa-ipad-server</string>
    <key>CFBundleName</key>
    <string>PWA iPad Server</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleIconFile</key>
    <string>app-icon</string>
    <key>LSUIElement</key>
    <false/>
</dict>
</plist>
EOF

# Créer le script exécutable principal
cat > "$APP_DIR/Contents/MacOS/PWA iPad Server" << 'EOF'
#!/bin/bash

# Obtenir le répertoire du projet (dossier parent de l'app)
PROJECT_DIR="$(dirname "$(dirname "$(dirname "$0")")")"
cd "$PROJECT_DIR"

# Ouvrir Terminal et exécuter le script de lancement
osascript << 'APPLESCRIPT'
tell application "Terminal"
    activate
    set projectPath to do shell script "dirname \"$(dirname \"$(dirname \"" & (POSIX path of (path to me)) & ")\"))\""
    do script "cd '" & projectPath & "' && ./launch-server.sh"
end tell
APPLESCRIPT
EOF

# Rendre le script exécutable
chmod +x "$APP_DIR/Contents/MacOS/PWA iPad Server"

# Créer une icône simple (optionnel)
cat > "$APP_DIR/Contents/Resources/app-icon.icns" << 'EOF'
# Icône temporaire (vous pouvez la remplacer par une vraie icône .icns)
EOF

echo "✅ Application créée : $APP_DIR"
echo "📱 Double-cliquez sur '$APP_DIR' pour lancer le serveur !"
echo ""
echo "💡 L'application ouvrira Terminal et lancera automatiquement le serveur" 