// Variables pour les sons et le fond
let sound1 = null;
let sound2 = null;
let bg = "grey";
let bgImage = null; // Image uploadée par l'utilisateur

// Variables pour les volumes (0.0 = silencieux, 1.0 = maximum)
let volume1 = 0.5;
let volume2 = 0.5;

// Variables pour les boutons
let play1 = null;
let play2 = null;

// Variables pour les sliders de volume
let slider1 = null;
let slider2 = null;

// Variables pour les sliders de temps
let timeSlider1 = null;
let timeSlider2 = null;
let isDraggingTime1 = false; // Pour savoir si l'utilisateur fait glisser le slider de temps 1
let isDraggingTime2 = false; // Pour savoir si l'utilisateur fait glisser le slider de temps 2

// Variables pour le crossfader
let crossfader = null;
let crossfaderValue = 50; // Valeur initiale à 50% (milieu)

// Variables pour l'analyse d'amplitude
let amp1 = null;
let amp2 = null;
let pulseSize1 = 80; // Taille de base des cercles
let pulseSize2 = 80;

// Variables pour les file inputs (upload de fichiers)
let fileInputBg = null;
let fileInputSound1 = null;
let fileInputSound2 = null;

// Fonctions de grille pour un positionnement responsive
// Convertit une colonne (0-5) en position X en pixels
// PAIN POINT: Ces fonctions utilisent width/height qui ne sont disponibles que dans draw()
// Dans setup(), on utilise directement windowWidth/windowHeight dans les calculs
function gridX(cellX)
{
    return (width / 6) * cellX;
}

// Convertit une ligne (0-5) en position Y en pixels
function gridY(cellY)
{
    return (height / 6) * cellY;
}

// Fonction pour formater le temps en MM:SS
function formatTime(seconds)
{
    // Calculer les minutes et secondes
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    
    // Utiliser padStart pour avoir toujours 2 chiffres
    let minutesStr = String(minutes).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    
    return minutesStr + ":" + secsStr;
}

// Fonction pour appliquer le crossfader
function applyCrossfader()
{
    // Convertir la valeur du crossfader (0-100) en angle (0 à π/2)
    let angle = (crossfaderValue / 100) * (PI / 2);
    
    // Calculer les volumes avec cos et sin pour des transitions douces
    let vol1 = cos(angle) * volume1;
    let vol2 = sin(angle) * volume2;
    
    // Appliquer les volumes aux sons qui jouent
    if (sound1.isPlaying()) {
        sound1.setVolume(vol1);
    }
    if (sound2.isPlaying()) {
        sound2.setVolume(vol2);
    }
}

// Fonction pour dessiner la visualisation de l'amplitude
function drawAmplitudeVisualization()
{
    // Obtenir les niveaux d'amplitude
    let level1 = 0;
    let level2 = 0;
    
    if (amp1) {
        level1 = amp1.getLevel();
    }
    if (amp2) {
        level2 = amp2.getLevel();
    }
    
    // Calculer la taille des cercles en fonction de l'amplitude
    pulseSize1 = 80 + (level1 * 400);
    pulseSize2 = 80 + (level2 * 400);
    
    // Dessiner les cercles au centre
    noFill();
    stroke(255, 100);
    strokeWeight(3);
    
    // Cercle pour la piste 1 (à gauche du centre)
    circle(width / 2 - 100, height / 2, pulseSize1);
    
    // Cercle pour la piste 2 (à droite du centre)
    circle(width / 2 + 100, height / 2, pulseSize2);
}

// Fonction pour charger les fichiers avant le démarrage
function preload()
{
    // Charger les sons depuis le dossier assets
    sound1 = loadSound("assets/sound1.mp3");
    sound2 = loadSound("assets/sound2.mp3");
    
    // Charger l'image de fond
    bg = loadImage("assets/bg.png");
}

// Fonction appelée quand on clique sur play1 (toggle play/pause)
function onClickPlay1()
{
    // Si le son joue, on le met en pause
    if (sound1.isPlaying()) {
        sound1.pause();
    } else {
        // Sinon on le joue, mais avant on définit le volume et la boucle
        sound1.setVolume(volume1);
        sound1.setLoop(true);
        sound1.play();
    }
}

// Fonction appelée quand on clique sur play2 (toggle play/pause)
function onClickPlay2()
{
    if (sound2.isPlaying()) {
        sound2.pause();
    } else {
        sound2.setVolume(volume2);
        sound2.setLoop(true);
        sound2.play();
    }
}

// Fonction appelée quand l'utilisateur upload une image de fond
function handleBackgroundImage(file)
{
    // Vérifier que c'est bien une image
    if (file.type === 'image') {
        // Charger l'image et la stocker dans bgImage
        bgImage = loadImage(file.data);
    }
}

// Fonction appelée quand l'utilisateur upload un son pour la piste 1
function onUploadSound1(file)
{
    // Vérifier que c'est bien un fichier audio
    if (file.type === 'audio') {
        // Arrêter le son actuel s'il joue
        if (sound1.isPlaying()) {
            sound1.stop();
        }
        // Charger le nouveau son
        sound1 = loadSound(file.data);
        // Définir le volume et la boucle
        sound1.setVolume(volume1);
        sound1.setLoop(true);
        
        // PAIN POINT: Le délai de 100ms peut ne pas être suffisant selon la taille du fichier
        // Connecter l'analyseur d'amplitude après un petit délai
        // Le délai permet au son de s'initialiser correctement
        setTimeout(function() {
            if (amp1 && sound1) {
                amp1.setInput(sound1);
            }
        }, 100);
    }
}

// Fonction appelée quand l'utilisateur upload un son pour la piste 2
function onUploadSound2(file)
{
    if (file.type === 'audio') {
        if (sound2.isPlaying()) {
            sound2.stop();
        }
        sound2 = loadSound(file.data);
        sound2.setVolume(volume2);
        sound2.setLoop(true);
        
        // PAIN POINT: Le délai de 100ms peut ne pas être suffisant selon la taille du fichier
        // Connecter l'analyseur d'amplitude après un petit délai
        setTimeout(function() {
            if (amp2 && sound2) {
                amp2.setInput(sound2);
            }
        }, 100);
    }
}

// Fonction d'initialisation - appelée une seule fois au démarrage
function setup()
{
    // Créer un canvas qui prend toute la taille de l'écran
    createCanvas(windowWidth, windowHeight);
    
    // Créer les analyseurs d'amplitude
    amp1 = new p5.Amplitude();
    amp2 = new p5.Amplitude();
    
    // Connecter les analyseurs aux sons
    amp1.setInput(sound1);
    amp2.setInput(sound2);
    
    // Créer les file inputs pour uploader des fichiers
    // Image de fond
    fileInputBg = createFileInput(handleBackgroundImage);
    fileInputBg.position(windowWidth / 6 * 1, windowHeight / 6 * 0);
    fileInputBg.attribute('accept', 'image/*');
    
    // Sons
    fileInputSound1 = createFileInput(onUploadSound1);
    fileInputSound1.position(windowWidth / 6 * 1, windowHeight / 6 * 1);
    fileInputSound1.attribute('accept', 'audio/*');
    
    fileInputSound2 = createFileInput(onUploadSound2);
    fileInputSound2.position(windowWidth / 6 * 4, windowHeight / 6 * 1);
    fileInputSound2.attribute('accept', 'audio/*');
    
    // Créer les boutons play/pause (toggle)
    play1 = createButton("▶⏸");
    play2 = createButton("▶⏸");
    
    // Personnaliser les boutons
    play1.style("width: 100px; height: 100px; color: red; background-color: lime");
    play2.style("width: 100px; height: 100px; color: blue; background-color: pink");
    
    // Positionner avec le système de grille
    play1.position(windowWidth / 6 * 1, windowHeight / 6 * 2);
    play2.position(windowWidth / 6 * 4, windowHeight / 6 * 2);
    
    // Associer les fonctions aux boutons
    play1.mousePressed(onClickPlay1);
    play2.mousePressed(onClickPlay2);
    
    // Créer les sliders de volume (0 à 1, valeur initiale 0.5, pas de 0.1)
    slider1 = createSlider(0, 1, 0.5, 0.1);
    slider2 = createSlider(0, 1, 0.5, 0.1);
    
    // Positionner les sliders de volume
    slider1.position(windowWidth / 6 * 1, windowHeight / 6 * 3);
    slider2.position(windowWidth / 6 * 4, windowHeight / 6 * 3);
    
    // Créer les sliders de temps (0 à 1, valeur initiale 0, pas de 0.1)
    timeSlider1 = createSlider(0, 1, 0, 0.1);
    timeSlider2 = createSlider(0, 1, 0, 0.1);
    
    // Positionner les sliders de temps sous les sliders de volume
    timeSlider1.position(windowWidth / 6 * 1, windowHeight / 6 * 4);
    timeSlider2.position(windowWidth / 6 * 4, windowHeight / 6 * 4);
    
    // Quand l'utilisateur déplace le slider de temps 1
    // PAIN POINT: isDraggingTime1 est mis à false immédiatement, ce qui peut causer des problèmes
    // Une meilleure approche serait d'utiliser mousePressed/mouseReleased sur le slider
    timeSlider1.input(function() {
        isDraggingTime1 = true;
        // Calculer le temps cible en fonction de la position du slider
        let targetTime = timeSlider1.value() * sound1.duration();
        // Sauter à cette position dans le son
        if (sound1 && sound1.isLoaded()) {
            sound1.jump(targetTime);
        }
        isDraggingTime1 = false;
    });
    
    // Quand l'utilisateur déplace le slider de temps 2
    timeSlider2.input(function() {
        isDraggingTime2 = true;
        let targetTime = timeSlider2.value() * sound2.duration();
        if (sound2 && sound2.isLoaded()) {
            sound2.jump(targetTime);
        }
        isDraggingTime2 = false;
    });
    
    // Créer le crossfader (0 à 100, valeur initiale 50, pas de 0.1)
    crossfader = createSlider(0, 100, 50, 0.1);
    crossfader.position(width / 2 - 100, height * 0.9);
    
    // Activer la boucle pour les sons
    sound1.setLoop(true);
    sound2.setLoop(true);
}

// Fonction de dessin - appelée en boucle
function draw()
{
    // Afficher le fond
    // Si une image a été uploadée, on l'affiche, sinon on utilise bg
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(bg);
    }
    
    // Lire les valeurs des sliders et les stocker dans les variables volume
    volume1 = slider1.value();
    volume2 = slider2.value();
    
    // Lire la valeur du crossfader
    crossfaderValue = crossfader.value();
    
    // Appliquer le crossfader (remplace l'application directe des volumes)
    applyCrossfader();
    
    // Mettre à jour les sliders de temps pendant la lecture
    // Seulement si l'utilisateur ne les fait pas glisser
    // PAIN POINT: Vérifier isLoaded() pour éviter les erreurs si le son n'est pas encore chargé
    if (sound1 && sound1.isLoaded() && sound1.isPlaying() && !isDraggingTime1) {
        // Calculer la position actuelle (0 à 1)
        let progress = sound1.currentTime() / sound1.duration();
        // Mettre à jour le slider
        timeSlider1.value(progress);
    }
    
    if (sound2 && sound2.isLoaded() && sound2.isPlaying() && !isDraggingTime2) {
        let progress = sound2.currentTime() / sound2.duration();
        timeSlider2.value(progress);
    }
    
    // Dessiner la visualisation de l'amplitude
    drawAmplitudeVisualization();
    
    // Afficher le titre
    fill(255);
    textAlign(CENTER);
    textSize(min(width, height) * 0.04);
    text("DJ Mixing Deck", width / 2, height / 12);
    
    // Afficher les labels pour les file inputs
    fill(255);
    textAlign(LEFT);
    textSize(16);
    text("Upload Background:", windowWidth / 6 * 1, windowHeight / 6 * 0 - 20);
    text("Upload Track 1:", windowWidth / 6 * 1, windowHeight / 6 * 1 - 20);
    text("Upload Track 2:", windowWidth / 6 * 4, windowHeight / 6 * 1 - 20);
    
    // Afficher les labels pour les sliders de volume
    text("Volume", windowWidth / 6 * 1, windowHeight / 6 * 3 - 20);
    text("Volume", windowWidth / 6 * 4, windowHeight / 6 * 3 - 20);
    
    // Afficher les labels pour les sliders de temps
    text("duration", windowWidth / 6 * 1, windowHeight / 6 * 4 - 20);
    text("duration", windowWidth / 6 * 4, windowHeight / 6 * 4 - 20);
    
    // Afficher le label pour le crossfader
    textAlign(CENTER);
    text("crossfader", width / 2, height * 0.9 - 20);
    
    // Afficher le temps écoulé / durée totale pour chaque piste
    // PAIN POINT: Toujours vérifier isLoaded() avant d'accéder à currentTime() ou duration()
    fill(255);
    textAlign(LEFT);
    textSize(14);
    if (sound1 && sound1.isLoaded()) {
        let time1 = formatTime(sound1.currentTime());
        let duration1 = formatTime(sound1.duration());
        text(time1 + " / " + duration1, windowWidth / 6 * 1, windowHeight / 6 * 4 + 30);
    }
    if (sound2 && sound2.isLoaded()) {
        let time2 = formatTime(sound2.currentTime());
        let duration2 = formatTime(sound2.duration());
        text(time2 + " / " + duration2, windowWidth / 6 * 4, windowHeight / 6 * 4 + 30);
    }
}

