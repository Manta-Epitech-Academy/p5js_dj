// Variables pour les sons et le fond
let sound1 = null;
let sound2 = null;
let bg = "grey";

// Variables pour les boutons
let play1 = null;
let pause1 = null;
let play2 = null;
let pause2 = null;

// Fonction pour charger les fichiers avant le démarrage
function preload()
{
    // Charger les sons depuis le dossier assets
    sound1 = loadSound("assets/sound1.mp3");
    sound2 = loadSound("assets/sound2.mp3");
    
    // Charger l'image de fond
    bg = loadImage("assets/bg.png");
}

// Fonction appelée quand on clique sur play1
function onClickPlay1()
{
    // Vérifier si le son n'est pas déjà en train de jouer
    // Sinon on aurait plusieurs instances qui jouent en même temps
    if (!sound1.isPlaying()) {
        sound1.play();
    }
}

// Fonction appelée quand on clique sur pause1
function onClickPause1()
{
    // Vérifier si le son est en train de jouer avant de le mettre en pause
    if (sound1.isPlaying()) {
        sound1.pause();
    }
}

// Fonction appelée quand on clique sur play2
function onClickPlay2()
{
    if (!sound2.isPlaying()) {
        sound2.play();
    }
}

// Fonction appelée quand on clique sur pause2
function onClickPause2()
{
    if (sound2.isPlaying()) {
        sound2.pause();
    }
}

// Fonction d'initialisation - appelée une seule fois au démarrage
function setup()
{
    // Créer un canvas qui prend toute la taille de l'écran
    createCanvas(windowWidth, windowHeight);
    
    // Créer les boutons pour la piste 1
    play1 = createButton("play1");
    pause1 = createButton("pause1");
    
    // Créer les boutons pour la piste 2
    play2 = createButton("play2");
    pause2 = createButton("pause2");
    
    // Personnaliser les boutons avec des styles CSS
    play1.style("width: 100px; height: 100px; color: red; background-color: lime");
    pause1.style("width: 100px; height: 100px; color: red; background-color: green");
    play2.style("width: 100px; height: 100px; color: blue; background-color: pink");
    pause2.style("width: 100px; height: 100px; color: blue; background-color: purple");
    
    // Positionner les boutons sur le canvas
    // Piste 1 à gauche
    play1.position((windowWidth/3) - 100, (windowHeight/2) - 100);
    pause1.position((windowWidth/3) - 100, (windowHeight/2) + 20);
    
    // Piste 2 à droite
    play2.position((windowWidth/3 * 2), (windowHeight/2) - 100);
    pause2.position((windowWidth/3 * 2), (windowHeight/2) + 20);
    
    // Associer les fonctions aux boutons
    play1.mousePressed(onClickPlay1);
    pause1.mousePressed(onClickPause1);
    play2.mousePressed(onClickPlay2);
    pause2.mousePressed(onClickPause2);
    
    // Activer la boucle pour les sons (ils se répètent automatiquement)
    sound1.setLoop(true);
    sound2.setLoop(true);
}

// Fonction de dessin - appelée en boucle
function draw()
{
    // Afficher le fond (image ou couleur)
    background(bg);
}

