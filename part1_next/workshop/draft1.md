# Atelier : Améliorer votre Table de Mixage DJ

Bienvenue dans la suite de l'atelier ! Vous avez déjà créé une table de mixage de base avec deux pistes, des boutons play/pause, et la possibilité de charger vos propres sons. Maintenant, nous allons l'améliorer pour en faire une vraie table de mixage professionnelle !

---

## Introduction : Ce que nous allons améliorer

Dans cet atelier, vous allez ajouter à votre table de mixage existante :
- Des sliders de volume pour contrôler chaque piste indépendamment
- Un système de grille pour un positionnement professionnel et responsive
- La possibilité d'uploader vos propres images de fond
- La possibilité d'uploader de nouveaux sons pendant que l'application tourne
- Un bouton unique play/pause pour chaque piste (au lieu de deux boutons séparés)
- Une interface plus claire avec des labels et un titre

**Connexion avec ce que vous savez déjà** : Vous avez déjà appris à créer des boutons, charger des sons, et utiliser `windowWidth` et `windowHeight`. Nous allons utiliser ces connaissances et les étendre avec de nouvelles fonctionnalités !

---

## Pour commencer : Votre code actuel

Vous devriez avoir un code similaire à celui-ci (venant de part00_starter) :

```javascript
let sound1 = null;
let sound2 = null;
let bg = "grey";

function preload() {
    sound1 = loadSound("assets/sound1.mp3");
    sound1.setLoop(true);
    sound2 = loadSound("assets/sound2.mp3");
    sound2.setLoop(true);
    bg = loadImage("assets/bg.png");
}

function onClickPlay1() {
    if (!sound1.isPlaying()) {
        sound1.play();
    }
}

function onClickPause1() {
    if (sound1.isPlaying()) {
        sound1.pause();
    }
}

function onClickPlay2() {
    if (!sound2.isPlaying()) {
        sound2.play();
    }
}

function onClickPause2() {
    if (sound2.isPlaying()) {
        sound2.pause();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    play1 = createButton("play1");
    play2 = createButton("play2");
    pause1 = createButton("pause1");
    pause2 = createButton("pause2");
    // ... positionnement et styles ...
    play1.mousePressed(onClickPlay1);
    pause1.mousePressed(onClickPause1);
    play2.mousePressed(onClickPlay2);
    pause2.mousePressed(onClickPause2);
}

function draw() {
    background(bg);
}
```

**N.B.** : Si vous n'avez pas encore ce code, retournez d'abord à l'atelier part00_starter pour apprendre les bases.

---

## Étape 1 : Ajouter des sliders de volume

### Comprendre les sliders

Un slider est un contrôle que vous pouvez faire glisser pour ajuster une valeur. C'est comme un bouton de volume sur une chaîne stéréo - vous le déplacez pour changer le volume.

**Ce qu'un slider fait** :
- Il a une plage de valeurs (par exemple de 0 à 100)
- Il a une position actuelle (où il se trouve sur cette plage)
- Il retourne une valeur que vous pouvez utiliser dans votre code

### Étape 1A : Créer des variables pour les volumes

Avant de créer les sliders, nous avons besoin de variables pour stocker les volumes de chaque piste.

**Exercice** : Ajoutez au début de votre code (après les variables `sound1`, `sound2`, `bg`) :
- Une variable `volume1` initialisée à `0.5` (50% de volume)
- Une variable `volume2` initialisée à `0.5` (50% de volume)

**N.B.** : Les volumes dans p5.js vont de 0.0 (silencieux) à 1.0 (volume maximum). 0.5 représente donc 50% du volume.

### Étape 1B : Créer les sliders

Dans p5.js, vous pouvez créer un slider avec la fonction `createSlider()`.

**Documentation** : [`createSlider()`](https://p5js.org/reference/p5/createSlider) crée un élément slider.

**Exercice** : Dans votre fonction `setup()`, après avoir créé vos boutons, créez deux sliders :
- Un slider `slider1` avec une plage de 0 à 100, commençant à 50
- Un slider `slider2` avec une plage de 0 à 100, commençant à 50

**N.B.** : Les sliders utilisent des valeurs de 0 à 100 (pourcentage), mais les sons utilisent des valeurs de 0.0 à 1.0. Nous devrons convertir plus tard.

**Exemple** :
```javascript
slider1 = createSlider(0, 100, 50);
slider2 = createSlider(0, 100, 50);
```

### Étape 1C : Positionner les sliders

**Exercice** : Positionnez vos sliders sur le canvas. Placez-les en dessous des boutons play/pause de chaque piste.

**Astuce** : Utilisez `.position(x, y)` comme vous l'avez fait pour les boutons. Par exemple, si votre bouton play1 est à `(windowWidth/3 - 100, windowHeight/2 - 100)`, vous pourriez placer slider1 à `(windowWidth/3 - 100, windowHeight/2 + 20)`.

**Testez !** Vous devriez voir deux sliders que vous pouvez faire glisser !

### Étape 1D : Lire les valeurs des sliders et les convertir

Les sliders retournent des valeurs de 0 à 100, mais les sons ont besoin de valeurs de 0.0 à 1.0. Il faut donc convertir.

**Le concept** : Pour convertir de 0-100 à 0.0-1.0, il suffit de diviser par 100. Par exemple :
- 50 ÷ 100 = 0.5 (50% devient 0.5)
- 75 ÷ 100 = 0.75 (75% devient 0.75)
- 0 ÷ 100 = 0.0 (0% devient 0.0)

**Exercice** : Dans votre fonction `draw()`, lisez les valeurs des sliders et convertissez-les en volumes :
- Lisez la valeur de `slider1` avec `.value()` et divisez par 100, stockez le résultat dans `volume1`
- Faites de même pour `slider2` et `volume2`

**Exemple** :
```javascript
function draw() {
    background(bg);
    
    // Lire et convertir les valeurs des sliders
    volume1 = slider1.value() / 100;
    volume2 = slider2.value() / 100;
}
```

### Étape 1E : Appliquer le volume aux sons

Maintenant que nous avons les volumes, il faut les appliquer aux sons qui sont en train de jouer.

**Exercice** : Dans votre fonction `draw()`, après avoir calculé les volumes, vérifiez si chaque son est en train de jouer, et si oui, appliquez le volume avec `.setVolume()`.

**Documentation** : [`.setVolume()`](https://p5js.org/reference/p5.SoundFile/setVolume/) définit le volume d'un son.

**Exemple** :
```javascript
if (sound1.isPlaying()) {
    sound1.setVolume(volume1);
}
if (sound2.isPlaying()) {
    sound2.setVolume(volume2);
}
```

**Testez !** Lancez un son et déplacez le slider - le volume devrait changer en temps réel !

---

## Étape 2 : Un seul bouton play/pause au lieu de deux

### Comprendre la bascule (toggle)

Au lieu d'avoir deux boutons séparés (play et pause), nous allons créer un seul bouton qui fait les deux : s'il joue, il met en pause ; s'il est en pause, il joue. C'est ce qu'on appelle une "bascule" (toggle en anglais).

**Analogie** : C'est comme un interrupteur de lumière - un seul bouton qui allume ou éteint.

### Étape 2A : Créer une fonction de bascule

**Exercice** : Créez une fonction `toggleTrack1()` qui :
1. Vérifie si `sound1` est en train de jouer avec `.isPlaying()`
2. Si oui : met en pause avec `.pause()`
3. Si non : joue le son avec `.play()`, mais avant de jouer :
   - Définissez le volume avec `.setVolume(volume1)`
   - Activez la boucle avec `.setLoop(true)`

**Exemple** :
```javascript
function toggleTrack1() {
    if (sound1.isPlaying()) {
        sound1.pause();
    } else {
        sound1.setVolume(volume1);
        sound1.setLoop(true);
        sound1.play();
    }
}
```

**Exercice** : Créez la même fonction pour la piste 2 : `toggleTrack2()`

### Étape 2B : Remplacer les boutons

**Exercice** : Dans votre fonction `setup()`, remplacez les quatre boutons (play1, pause1, play2, pause2) par deux boutons :
- Un bouton `button1` avec le label "▶⏸" (ou "Play/Pause")
- Un bouton `button2` avec le label "▶⏸" (ou "Play/Pause")

**Exercice** : Connectez ces boutons aux fonctions de bascule :
- `button1.mousePressed(toggleTrack1)`
- `button2.mousePressed(toggleTrack2)`

**N.B.** : Vous pouvez supprimer les anciennes fonctions `onClickPlay1`, `onClickPause1`, `onClickPlay2`, `onClickPause2` car elles ne sont plus nécessaires.

**Testez !** Cliquez sur un bouton - le son devrait jouer. Cliquez à nouveau - il devrait se mettre en pause !

---

## Étape 3 : Créer un système de grille pour le positionnement

### Comprendre le système de grille

Pour faciliter le positionnement et rendre votre application vraiment responsive, nous allons diviser le canvas en une grille 6x6 (6 colonnes et 6 lignes). Cela nous permettra de positionner les éléments facilement.

**Le concept** : Au lieu de calculer manuellement `windowWidth / 3` ou `windowHeight / 2`, nous allons créer des fonctions qui convertissent des coordonnées de grille (comme "colonne 1, ligne 2") en positions pixels.

### Étape 3A : Créer les fonctions de grille

**Exercice** : Créez deux fonctions utilitaires au début de votre code (avant `preload()`) :

1. `gridX(cellX)` - Prend un numéro de colonne (0 à 5) et retourne la position X en pixels
2. `gridY(cellY)` - Prend un numéro de ligne (0 à 5) et retourne la position Y en pixels

**La logique** :
- Pour une grille de 6 colonnes, la colonne 0 est à X = 0, la colonne 1 est à X = `width / 6`, la colonne 2 est à X = `2 * width / 6`, etc.
- Même chose pour les lignes avec `height`

**Exemple** :
```javascript
function gridX(cellX) {
    return cellX * width / 6;
}

function gridY(cellY) {
    return cellY * height / 6;
}
```

**N.B.** : Ces fonctions utilisent `width` et `height` qui sont disponibles dans `draw()`, mais pour les utiliser dans `setup()`, vous devrez utiliser `windowWidth` et `windowHeight` directement dans les calculs, ou créer des versions qui acceptent ces valeurs.

**Astuce** : Vous pouvez modifier les fonctions pour accepter la largeur et la hauteur en paramètres, ou utiliser `windowWidth` et `windowHeight` directement dans `setup()`.

### Étape 3B : Repositionner les éléments avec la grille

**Exercice** : Repositionnez tous vos éléments UI en utilisant le système de grille :
- Bouton 1 : Colonne 1, Ligne 2 (utilisez `gridX(1)` et `gridY(2)`, mais dans `setup()` utilisez `windowWidth` et `windowHeight`)
- Slider 1 : Colonne 1, Ligne 3
- Bouton 2 : Colonne 4, Ligne 2
- Slider 2 : Colonne 4, Ligne 3

**Exemple pour setup()** :
```javascript
button1.position(windowWidth / 6 * 1, windowHeight / 6 * 2);
slider1.position(windowWidth / 6 * 1, windowHeight / 6 * 3);
button2.position(windowWidth / 6 * 4, windowHeight / 6 * 2);
slider2.position(windowWidth / 6 * 4, windowHeight / 6 * 3);
```

**Testez !** Redimensionnez la fenêtre de votre navigateur - les éléments devraient s'adapter automatiquement !

---

## Étape 4 : Ajouter l'upload d'images de fond

### Comprendre l'upload de fichiers

Jusqu'à présent, vous chargez les images depuis le dossier `assets`. Maintenant, nous allons permettre aux utilisateurs d'uploader leurs propres images pendant que l'application tourne.

### Étape 4A : Créer une variable pour l'image uploadée

**Exercice** : Ajoutez une variable `bgImage` au début de votre code, initialisée à `null`.

**N.B.** : Cette variable stockera l'image uploadée par l'utilisateur. Si elle est `null`, on utilisera l'image `bg` chargée dans `preload()`.

### Étape 4B : Créer le bouton d'upload

Dans p5.js, vous pouvez créer un bouton d'upload avec `createFileInput()`.

**Documentation** : [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) crée un bouton d'upload de fichier.

**Exercice** : Dans votre fonction `setup()`, créez un file input pour les images :
- Créez-le avec `createFileInput(handleBackgroundImage)`
- Positionnez-le en haut du canvas (par exemple, colonne 1, ligne 0)
- Restreignez-le aux images avec `.attribute('accept', 'image/*')`

**Exemple** :
```javascript
let bgFileInput = createFileInput(handleBackgroundImage);
bgFileInput.position(windowWidth / 6 * 1, windowHeight / 6 * 0);
bgFileInput.attribute('accept', 'image/*');
```

### Étape 4C : Créer la fonction de gestion

**Exercice** : Créez une fonction `handleBackgroundImage(file)` qui :
1. Vérifie si le fichier est une image avec `file.type === 'image'`
2. Si oui, charge l'image avec `loadImage(file.data)` et stocke-la dans `bgImage`

**Documentation** : [`loadImage()`](https://p5js.org/reference/p5/loadImage) charge les fichiers image.

**Exemple** :
```javascript
function handleBackgroundImage(file) {
    if (file.type === 'image') {
        bgImage = loadImage(file.data);
    }
}
```

### Étape 4D : Afficher l'image uploadée

**Exercice** : Dans votre fonction `draw()`, modifiez l'affichage du fond :
- Si `bgImage` existe (n'est pas `null`), affichez-la avec `image(bgImage, 0, 0, width, height)`
- Sinon, utilisez `background(bg)` comme avant

**Documentation** : [`image()`](https://p5js.org/reference/p5/image) dessine une image.

**Exemple** :
```javascript
function draw() {
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(bg);
    }
    
    // ... reste du code ...
}
```

**Testez !** Cliquez sur le bouton d'upload et sélectionnez une image - elle devrait apparaître comme fond !

---

## Étape 5 : Ajouter l'upload de sons pour les pistes

### Comprendre l'upload de sons

Maintenant, nous allons permettre aux utilisateurs d'uploader de nouveaux sons pour remplacer ceux chargés au départ.

### Étape 5A : Créer les boutons d'upload de sons

**Exercice** : Dans votre fonction `setup()`, créez deux file inputs pour les sons :
- Un pour la piste 1 : `createFileInput(function(file) { handleSound1(file); })`
- Un pour la piste 2 : `createFileInput(function(file) { handleSound2(file); })`
- Positionnez-les (par exemple, colonne 1 ligne 1 pour piste 1, colonne 4 ligne 1 pour piste 2)
- Restreignez-les aux fichiers audio avec `.attribute('accept', 'audio/*')`

**Exemple** :
```javascript
let sound1FileInput = createFileInput(function(file) { handleSound1(file); });
sound1FileInput.position(windowWidth / 6 * 1, windowHeight / 6 * 1);
sound1FileInput.attribute('accept', 'audio/*');

let sound2FileInput = createFileInput(function(file) { handleSound2(file); });
sound2FileInput.position(windowWidth / 6 * 4, windowHeight / 6 * 1);
sound2FileInput.attribute('accept', 'audio/*');
```

### Étape 5B : Créer les fonctions de gestion

**Exercice** : Créez deux fonctions `handleSound1(file)` et `handleSound2(file)` qui :
1. Vérifient si le fichier est audio avec `file.type === 'audio'`
2. Si oui :
   - Arrêtent le son actuel s'il est en train de jouer avec `.stop()`
   - Chargent le nouveau son avec `loadSound(file.data)` et le stockent dans `sound1` (ou `sound2`)
   - Définissent le volume avec `.setVolume(volume1)` (ou `volume2`)
   - Activent la boucle avec `.setLoop(true)`

**Documentation** : [`loadSound()`](https://p5js.org/reference/p5/loadSound/) charge les fichiers son.

**Exemple** :
```javascript
function handleSound1(file) {
    if (file.type === 'audio') {
        if (sound1 && sound1.isPlaying()) {
            sound1.stop();
        }
        sound1 = loadSound(file.data);
        sound1.setVolume(volume1);
        sound1.setLoop(true);
    }
}
```

**Exercice** : Créez la même fonction pour `handleSound2`.

**Testez !** Uploadez un nouveau son pour une piste - il devrait remplacer l'ancien !

---

## Étape 6 : Améliorer l'interface avec des labels

### Ajouter des labels

Pour rendre l'interface plus claire, nous allons ajouter du texte qui explique ce que fait chaque élément.

### Étape 6A : Ajouter un titre

**Exercice** : Dans votre fonction `draw()`, ajoutez un titre "DJ Mixing Deck" en haut du canvas, centré.

**Documentation** : [`text()`](https://p5js.org/reference/p5/text/) dessine du texte.

**Exemple** :
```javascript
function draw() {
    // ... fond ...
    
    // Titre
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.04);
    text("DJ Mixing Deck", width / 2, height / 12);
    
    // ... reste du code ...
}
```

**N.B.** : `textSize(min(width, height) * 0.04)` rend le texte responsive - il s'adapte à la taille de l'écran.

### Étape 6B : Ajouter des labels pour les file inputs

**Exercice** : Ajoutez du texte au-dessus de chaque file input pour expliquer ce qu'il fait :
- "Upload Background:" au-dessus du file input d'image
- "Upload Track 1:" au-dessus du file input de son 1
- "Upload Track 2:" au-dessus du file input de son 2

**Exemple** :
```javascript
textSize(min(width, height) * 0.025);
text("Upload Background:", windowWidth / 6 * 1, windowHeight / 6 * 0 - 10);
text("Upload Track 1:", windowWidth / 6 * 1, windowHeight / 6 * 1 - 10);
text("Upload Track 2:", windowWidth / 6 * 4, windowHeight / 6 * 1 - 10);
```

### Étape 6C : Ajouter des labels pour les sliders

**Exercice** : Ajoutez le texte "Volume" au-dessus de chaque slider.

**Exemple** :
```javascript
text("Volume", windowWidth / 6 * 1, windowHeight / 6 * 3 - 20);
text("Volume", windowWidth / 6 * 4, windowHeight / 6 * 3 - 20);
```

**Testez !** Votre interface devrait maintenant être beaucoup plus claire avec tous les labels !

---

## Tout mettre ensemble

### Le flux complet

Votre table de mixage devrait maintenant fonctionner comme ceci :

1. **Setup** : Créer le canvas, les boutons, les sliders, les file inputs
2. **Preload** : Charger les sons et l'image de départ
3. **Draw** (s'exécute en continu) :
   - Afficher le fond (image uploadée ou image de départ)
   - Afficher le titre et les labels
   - Lire les valeurs des sliders et les convertir en volumes
   - Appliquer les volumes aux sons en lecture
4. **Clics sur boutons** : Basculer play/pause pour chaque piste
5. **Uploads** : Les utilisateurs peuvent uploader de nouvelles images et sons

### Tester votre table de mixage

Testez chaque fonctionnalité :
- ✅ Cliquez sur button1 → sound1 joue
- ✅ Cliquez à nouveau sur button1 → sound1 se met en pause
- ✅ Cliquez sur button2 → sound2 joue
- ✅ Les deux pistes peuvent jouer en même temps (mixage !)
- ✅ Déplacez slider1 → le volume de sound1 change en temps réel
- ✅ Déplacez slider2 → le volume de sound2 change en temps réel
- ✅ Uploadez une image de fond → elle s'affiche comme fond
- ✅ Uploadez un son pour la piste 1 → il remplace le son par défaut
- ✅ Uploadez un son pour la piste 2 → il remplace le son par défaut
- ✅ Redimensionnez la fenêtre → tout s'adapte correctement

### Dépannage

**Le volume ne change pas ?**
- Vérifiez que vous lisez les valeurs des sliders dans `draw()`
- Vérifiez que vous appliquez le volume avec `.setVolume()` aux sons en lecture
- Vérifiez que vous divisez bien par 100 pour convertir

**L'image ne s'affiche pas après l'upload ?**
- Vérifiez que vous utilisez `image()` dans `draw()` et que vous vérifiez si `bgImage` existe

**Le son ne joue pas après l'upload ?**
- Assurez-vous que vous appelez `loadSound(file.data)` et que vous définissez le volume et la boucle

**Les éléments ne s'adaptent pas au redimensionnement ?**
- Vérifiez que vous utilisez `windowWidth` et `windowHeight` dans `setup()` pour le positionnement initial
- Les éléments créés dans `setup()` ne se déplacent pas automatiquement - c'est normal ! Pour un vrai responsive, il faudrait recréer les éléments, mais c'est plus avancé.

---

## Idées de personnalisation

Maintenant que votre table de mixage fonctionne, essayez de la personnaliser :

- **Uploadez vos chansons préférées**
- **Uploadez des images de fond personnalisées**
- **Changez les positions des éléments sur la grille**
- **Changez les couleurs et styles des boutons**
- **Ajoutez plus de pistes** (sound3, sound4, etc.)
- **Ajoutez un retour visuel quand les pistes jouent** (par exemple, changer la couleur du bouton)
- **Partagez votre table de mixage comme application mobile !**

**Rappelez-vous** : L'expérimentation est la façon dont on apprend ! Essayez des choses, voyez ce qui se passe, et apprenez-en.

---

## Félicitations ! 🎉

Vous avez amélioré votre table de mixage DJ avec des fonctionnalités professionnelles ! Vous avez appris :
- Comment créer et utiliser des sliders pour contrôler le volume
- Comment créer des fonctions de bascule (toggle)
- Comment utiliser un système de grille pour un positionnement responsive
- Comment gérer les uploads de fichiers (images et sons)
- Comment améliorer l'interface avec des labels et un titre
- Comment contrôler le volume en temps réel

Ces concepts vous aideront à construire des applications interactives encore plus complexes !

