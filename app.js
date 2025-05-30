class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.currentColor = '#000000';
        this.currentSize = 5;
        this.lastX = 0;
        this.lastY = 0;
        this.currentInputType = 'unknown';
        
        this.initCanvas();
        this.bindEvents();
        this.setupUI();
    }
    
    initCanvas() {
        // Ajuster la taille du canvas à son conteneur
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.resizeCanvas(), 100);
        });
        
        // Configuration du contexte pour un rendu optimal
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.imageSmoothingEnabled = true;//?
    }
    
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Sauvegarder le contenu actuel
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        // Redimensionner le canvas
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        // Ajuster l'affichage CSS
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Réappliquer la configuration du contexte
        this.ctx.scale(dpr, dpr);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.imageSmoothingEnabled = true;
        
        // Restaurer le contenu si possible
        if (imageData.width > 0 && imageData.height > 0) {
            this.ctx.putImageData(imageData, 0, 0);
        }
    }
    
    bindEvents() {
        // Événements tactiles (Apple Pencil inclus)
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        
        
        // Prévenir le comportement par défaut
        this.canvas.addEventListener('touchstart', (e) => e.preventDefault());
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault());
    }
    
    setupUI() {
        // Bouton effacer
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearCanvas();
        });
        
        // Bouton couleur
        document.getElementById('colorBtn').addEventListener('click', () => {
            this.toggleColorPicker();
        });
        
        // Slider taille du pinceau
        document.getElementById('brushSize').addEventListener('input', (e) => {
            this.currentSize = parseInt(e.target.value);
        });
        
        // Sélecteur de couleurs
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.currentColor = e.target.dataset.color;
                this.hideColorPicker();
            });
        });
        
        // Fermer le sélecteur de couleurs en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.color-picker') && !e.target.closest('#colorBtn')) {
                this.hideColorPicker();
            }
        });
    }
    
    detectInputType(touch) {
        // Méthode 1 : touchType (Safari iOS 13.4+)
        if (touch.touchType === 'stylus') {
            return 'pencil';
        } else if (touch.touchType === 'direct') {
            return 'finger';
        }
        
        // Méthode 2 : Analyse des propriétés tactiles
        const hasForce = touch.force !== undefined && touch.force > 0;
        const radiusX = touch.radiusX || 0;
        const radiusY = touch.radiusY || 0;
        const altitudeAngle = touch.altitudeAngle || 0;
        const azimuthAngle = touch.azimuthAngle || 0;
        
        // Apple Pencil a des propriétés spécifiques
        const hasAngles = altitudeAngle > 0 || azimuthAngle !== 0;
        const smallRadius = radiusX < 15 && radiusY < 15;
        const hasGoodForce = hasForce && touch.force < 1;
        
        if (hasAngles || (smallRadius && hasGoodForce)) {
            return 'pencil';
        }
        
        // Doigt : plus gros contact, pas d'angles
        if (radiusX > 15 || radiusY > 15) {
            return 'finger';
        }
        
        // Fallback
        return 'pencil';
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        
        // Détecter le type d'entrée
        this.currentInputType = this.detectInputType(touch);
        
        this.lastX = touch.clientX - rect.left;
        this.lastY = touch.clientY - rect.top;
        
        // Comportement selon l'outil
        if (this.currentInputType === 'pencil') {
            this.isDrawing = true;
            const pressure = touch.force || 0.5;
            const tilt = this.calculateTilt(touch);
            this.startDrawing(this.lastX, this.lastY, pressure, tilt);
            
            // Debug info
            console.log('🖊️ Apple Pencil détecté', {
                pressure: touch.force,
                radius: [touch.radiusX, touch.radiusY],
                angles: [touch.altitudeAngle, touch.azimuthAngle]
            });
        } else if (this.currentInputType === 'finger') {
            // Optionnel : gérer les gestes du doigt différemment
            this.handleFingerStart(touch);
            
            console.log('👆 Doigt détecté', {
                radius: [touch.radiusX, touch.radiusY]
            });
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        if (this.currentInputType === 'pencil' && this.isDrawing) {
            const pressure = touch.force || 0.5;
            const tilt = this.calculateTilt(touch);
            this.draw(this.lastX, this.lastY, x, y, pressure, tilt);
        } else if (this.currentInputType === 'finger') {
            // Gestes du doigt (pan, zoom, etc.)
            this.handleFingerMove(touch, x, y);
        }
        
        this.lastX = x;
        this.lastY = y;
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        
        if (this.currentInputType === 'pencil') {
            this.isDrawing = false;
        } else if (this.currentInputType === 'finger') {
            this.handleFingerEnd();
        }
        
        this.currentInputType = 'unknown';
    }
    
    calculateTilt(touch) {
        // Calculer l'inclinaison du stylet
        if (touch.altitudeAngle !== undefined) {
            return {
                altitude: touch.altitudeAngle,
                azimuth: touch.azimuthAngle || 0
            };
        }
        return { altitude: Math.PI/2, azimuth: 0 };
    }
    
    startDrawing(x, y, pressure, tilt) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.strokeStyle = this.currentColor;
        
        // Adapter la taille selon la pression et l'inclinaison
        const sizeMultiplier = 0.5 + pressure;
        const tiltEffect = Math.cos(tilt.altitude) * 0.3 + 0.7;
        
        this.ctx.lineWidth = this.currentSize * sizeMultiplier * tiltEffect;
        this.ctx.stroke();
    }
    
    draw(x1, y1, x2, y2, pressure, tilt) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = this.currentColor;
        
        // Taille variable selon pression et inclinaison
        const sizeMultiplier = 0.5 + pressure;
        const tiltEffect = Math.cos(tilt.altitude) * 0.3 + 0.7;
        
        this.ctx.lineWidth = this.currentSize * sizeMultiplier * tiltEffect;
        this.ctx.stroke();
    }
    
    // Gestion optionnelle des gestes du doigt
    handleFingerStart(touch) {
        // Par exemple : commencer un geste de zoom/pan
        // Ou simplement désactiver le dessin
    }
    
    handleFingerMove(touch, x, y) {
        // Gestes du doigt : navigation, zoom, etc.
        // Par exemple, permettre de déplacer la vue
    }
    
    handleFingerEnd() {
        // Fin du geste du doigt
    }
    
    // Fonctions utilitaires
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    toggleColorPicker() {
        const picker = document.getElementById('colorPicker');
        picker.classList.toggle('hidden');
    }
    
    hideColorPicker() {
        const picker = document.getElementById('colorPicker');
        picker.classList.add('hidden');
    }
    
    // Sauvegarde et chargement (pour une future extension)
    saveDrawing() {
        return this.canvas.toDataURL();
    }
    
    loadDrawing(dataURL) {
        const img = new Image();
        img.onload = () => {
            this.clearCanvas();
            this.ctx.drawImage(img, 0, 0);
        };
        img.src = dataURL;
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    const app = new DrawingApp();
    
    // Exposer l'app globalement pour le débogage
    window.drawingApp = app;
    
    console.log('PWA iPad - Apple Pencil initialisée');
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur dans l\'application:', e.error);
});

// Gestion de l'installation PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Optionnel: afficher un bouton d'installation personnalisé
    console.log('PWA peut être installée');
});

window.addEventListener('appinstalled', (e) => {
    console.log('PWA installée avec succès');
    deferredPrompt = null;
}); 