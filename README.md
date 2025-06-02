# PWA iPad - Apple Pencil

Une Progressive Web App (PWA) optimisée pour iPad Air et Apple Pencil, permettant de dessiner avec une interface tactile moderne.

## 🚀 Fonctionnalités

- ✏️ **Support Apple Pencil** : Détection de la pression pour des traits variables
- 📱 **Interface tactile** : Optimisée pour iPad avec gestes intuitifs
- 🎨 **Palette de couleurs** : Sélection rapide de couleurs
- 📏 **Taille de pinceau** : Ajustement dynamique avec slider
- 🔄 **Fonctionnement hors ligne** : Service Worker pour utilisation sans internet
- 📲 **Installation PWA** : Peut être installée comme une app native
- 🌓 **Mode sombre** : Support automatique du mode sombre système

## 🛠 Installation et utilisation

### Méthode 1 : Serveur local simple

```bash
# Cloner le projet
git clone [votre-repo]
cd NBLI

# Lancer un serveur HTTP simple
python3 -m http.server 8000
# ou
npx serve .
# ou
php -S localhost:8000
```

Puis ouvrir `http://localhost:8000` dans votre navigateur.

### Méthode 2 : Serveur Node.js (recommandé)

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

## 📱 Installation sur iPad

1. Ouvrir l'app dans Safari sur iPad
2. Appuyer sur le bouton de partage
3. Sélectionner "Ajouter à l'écran d'accueil"
4. L'app sera disponible comme une app native

## 🏗 Structure du projet

```
NBLI/
├── index.html          # Page principale
├── manifest.json       # Manifest PWA
├── sw.js              # Service Worker
├── app.js             # Logique JavaScript
├── styles.css         # Styles CSS
├── generate-icons.html # Générateur d'icônes
├── icons/             # Icônes PWA
└── README.md          # Documentation
```

## 🔧 Technologies utilisées

- **HTML5 Canvas** : Pour le dessin
- **CSS3** : Interface responsive et moderne
- **JavaScript ES6+** : Logique applicative
- **Service Worker** : Fonctionnement hors ligne
- **Web App Manifest** : Configuration PWA
- **Touch Events API** : Support tactile et Apple Pencil

## 📋 Fonctionnalités techniques

### Support Apple Pencil
- Détection de la pression (`touch.force`)
- Épaisseur de trait variable selon la pression
- Prévention des gestes système iOS

### Optimisations iPad
- Viewport adaptatif
- Gestion de l'orientation
- Interface tactile avec zones de touch optimisées
- Support du mode plein écran

### PWA
- Installation sur l'écran d'accueil
- Fonctionnement hors ligne
- Mise en cache intelligente
- Notifications push (préparé pour futures fonctionnalités)

## 🐛 Dépannage

### L'app ne s'installe pas
- Vérifier que vous utilisez HTTPS ou localhost
- Vérifier que le manifest.json est accessible
- Vider le cache du navigateur

### Apple Pencil ne fonctionne pas
- Vérifier que l'iPad supporte l'Apple Pencil
- Tester dans Safari (pas Chrome)
- Vérifier que les événements touch sont activés

### Service Worker ne fonctionne pas
- Vérifier la console pour les erreurs
- S'assurer que le fichier sw.js est accessible
- Tester en mode navigation privée

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.