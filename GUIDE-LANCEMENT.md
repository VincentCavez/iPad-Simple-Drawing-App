# 🚀 Guide de lancement du serveur PWA iPad

Ce guide explique comment utiliser les différentes méthodes pour lancer automatiquement le serveur de votre application PWA iPad.

## 📋 Options disponibles

### 1. 📱 Application macOS (Recommandée)
**Fichier :** `PWA iPad Server.app`

**Comment utiliser :**
- Double-cliquez sur `PWA iPad Server.app`
- L'application ouvrira Terminal automatiquement
- Le serveur démarre avec affichage de l'adresse IP
- ✅ **Plus simple à utiliser**

### 2. 🖥 Script Shell
**Fichier :** `launch-server.sh`

**Comment utiliser :**
- Double-cliquez sur `launch-server.sh` 
- Ou dans Terminal : `./launch-server.sh`
- Affiche automatiquement l'adresse IP pour l'iPad
- ✅ **Plus rapide**

### 3. 🎯 Script AppleScript (Avancé)
**Fichier :** `PWA-iPad-Launcher.scpt`

**Comment utiliser :**
1. Ouvrir `PWA-iPad-Launcher.scpt` dans "Éditeur de scripts"
2. Menu Fichier → Exporter → Format : Application
3. Sauvegarder comme `PWA iPad Launcher.app`
4. Double-cliquer sur la nouvelle application
- ✅ **Interface la plus élégante avec notifications**

## 🔧 Configuration automatique

L'adresse IP sera automatiquement détectée et affichée. Votre iPad pourra accéder à l'application via :
- `http://[VOTRE-IP]:8000`

## 💡 Conseils d'utilisation

### Pour l'iPad :
1. Ouvrir Safari sur l'iPad
2. Saisir l'adresse affichée par le script
3. Ajouter à l'écran d'accueil si nécessaire

### Pour arrêter le serveur :
- Appuyer sur `Ctrl+C` dans Terminal
- Ou fermer la fenêtre Terminal

## 🛠 Dépannage

### Si l'adresse IP ne s'affiche pas :
- Utiliser `http://localhost:8000` sur le même Mac
- Vérifier la connexion WiFi

### Si l'iPad ne peut pas se connecter :
- S'assurer que Mac et iPad sont sur le même réseau WiFi
- Vérifier que le firewall macOS autorise les connexions
- Redémarrer le serveur

### Permissions manquantes :
```bash
chmod +x launch-server.sh
chmod +x create-app.sh
```

## 📁 Structure des fichiers

```
NBLI/
├── PWA iPad Server.app/     # Application macOS prête à utiliser
├── launch-server.sh         # Script de lancement simple  
├── create-app.sh           # Script de création d'app (déjà utilisé)
├── PWA-iPad-Launcher.scpt  # Script AppleScript avancé
├── GUIDE-LANCEMENT.md      # Ce guide
└── [autres fichiers du projet PWA]
```

## 🎉 Utilisation recommandée

**Pour une utilisation quotidienne :** Utilisez `PWA iPad Server.app` - il suffit de double-cliquer !

L'application est maintenant prête à être lancée facilement à chaque fois que vous voulez dessiner sur votre iPad ! 🎨📱 