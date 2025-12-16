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
    }
}

// Fonction d'initialisation - appelée une seule fois au démarrage
function setup()
{
    // Créer un canvas qui prend toute la taille de l'écran
    createCanvas(windowWidth, windowHeight);
    
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
    
    // Positionner les sliders sous les boutons
    slider1.position(windowWidth / 6 * 1, windowHeight / 6 * 3);
    slider2.position(windowWidth / 6 * 4, windowHeight / 6 * 3);
    
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
    
    // Appliquer les volumes aux sons qui sont en train de jouer
    if (sound1.isPlaying()) {
        sound1.setVolume(volume1);
    }
    if (sound2.isPlaying()) {
        sound2.setVolume(volume2);
    }
    
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
    
    // Afficher les labels pour les sliders
    text("Volume", windowWidth / 6 * 1, windowHeight / 6 * 3 - 20);
    text("Volume", windowWidth / 6 * 4, windowHeight / 6 * 3 - 20);
}

