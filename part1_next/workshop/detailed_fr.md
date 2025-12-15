# Guide étape par étape : Créer une table de mixage DJ avec p5.js

Ce guide vous accompagne dans la création d'une table de mixage DJ à partir de zéro en utilisant p5.js. Chaque étape s'appuie sur la précédente, suivez donc les étapes dans l'ordre !

---

## Introduction : Comprendre le projet

### Ce que nous construisons

Une table de mixage DJ est un outil qui vous permet de jouer plusieurs sons simultanément et de les contrôler indépendamment. Notre table de mixage numérique sera une application web interactive qui permet aux utilisateurs de :
- Jouer deux sons différents en même temps
- Contrôler le volume de chaque son indépendamment
- Démarrer et arrêter chaque son avec des boutons
- Mélanger les sons ensemble comme un vrai DJ

**Analogie du monde réel** : Pensez à une installation DJ professionnelle avec deux platines. Chaque platine peut jouer un disque différent, et le DJ peut contrôler le volume de chacune indépendamment. Notre version numérique fonctionne de manière similaire - deux pistes, chacune avec ses propres contrôles !

### Concepts clés

**Fonctions** : Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Pensez-y comme des recettes - vous écrivez la recette une fois, puis vous pouvez la suivre (appeler la fonction) chaque fois que vous en avez besoin. Dans p5.js, `setup()` s'exécute une fois au démarrage du programme, et `draw()` s'exécute en continu (60 fois par seconde).

**Variables** : Les variables sont des conteneurs qui stockent des informations. Vous leur donnez un nom (comme `monNom`) et vous leur assignez une valeur (comme `"Alice"`). Les variables peuvent stocker différents types de données : texte (chaînes de caractères), nombres, valeurs vrai/faux (booléens), et plus encore.

**Objets** : Les objets sont des collections de données liées regroupées ensemble. Pensez à une carte de contact - elle a un nom, un numéro de téléphone, une adresse, etc. Dans notre table de mixage, chaque piste est un objet qui contient tout ce qui concerne cette piste : son son, volume, état de lecture, bouton et slider.

**Propriétés** : Les propriétés sont des morceaux d'information stockés dans un objet. Comme la taille, le poids et le nom d'une personne sont des propriétés d'un objet personne. Nos objets track ont des propriétés comme `sound`, `volume`, et `isPlaying`.

**Pensée orientée objet** : Au lieu d'avoir des variables séparées dispersées, nous organisons les données liées en objets. Cela rend le code plus facile à comprendre et à maintenir.

### Expliquer les concepts aux débutants

Lors de l'enseignement de cet atelier à des débutants absolus, vous devrez peut-être expliquer :

**Fonctions** : "Une fonction est comme une recette. Vous écrivez les étapes une fois, puis vous pouvez utiliser cette recette (appeler la fonction) chaque fois que vous en avez besoin. `setup()` est une recette spéciale qui s'exécute une fois au démarrage de votre programme. `draw()` est une recette qui s'exécute encore et encore."

**Variables** : "Une variable est comme une boîte étiquetée. Vous mettez une étiquette dessus (le nom de la variable) et vous mettez quelque chose à l'intérieur (la valeur). Plus tard, vous pouvez changer ce qui est à l'intérieur, mais l'étiquette reste la même."

**Objets** : "Un objet est comme un classeur avec plusieurs tiroirs. Chaque tiroir a une étiquette (nom de propriété) et contient quelque chose (valeur de propriété). Tous les tiroirs appartiennent à un classeur (objet)."

**Propriétés** : "Une propriété est un tiroir dans le classeur. Elle a une étiquette (le nom de la propriété) et contient quelque chose (la valeur de la propriété)."

---

## Étape 1 : Créer des objets Track

### Comprendre les objets

Un objet est un moyen de regrouper des informations liées ensemble. Au lieu d'avoir des variables séparées comme `sound1`, `volume1`, `isPlaying1`, `button1`, nous mettons tout ce qui concerne la piste 1 dans un objet appelé `track1`.

**Pourquoi utiliser des objets ?**
- Garde les données liées organisées
- Rend le code plus facile à comprendre
- Rend le code plus facile à maintenir
- Les développeurs professionnels utilisent cette approche

### Étape 1 (A) : Créer votre premier objet Track

Nous devons créer un objet qui stocke tout ce qui concerne la piste 1. Voici ce dont une piste a besoin :

```javascript
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 150,
        y: 350
    },
    buttonPosition: {
        x: 150,
        y: 200
    },
    buttonLabel: "Track 1"
};
```

**Comprendre le code** :
- `let track1 = { ... }` crée un objet appelé `track1`
- `sound: null` - nous chargerons le fichier son ici plus tard
- `volume: 0.5` - niveau de volume (0.5 = 50%, soit demi-volume)
- `isPlaying: false` - si la piste est actuellement en lecture
- `slider: null` - nous créerons le slider plus tard
- `button: null` - nous créerons le bouton plus tard
- `sliderPosition: { x: 150, y: 350 }` - où le slider sera positionné
- `buttonPosition: { x: 150, y: 200 }` - où le bouton sera positionné
- `buttonLabel: "Track 1"` - texte à afficher sur le bouton

**Pourquoi des objets de position séparés ?** Cela garde la position organisée dans l'objet track, ce qui facilite les modifications ultérieures. C'est comme avoir des tiroirs étiquetés dans une armoire de classement - chaque tiroir (position) a un objectif clair.

### Étape 1 (B) : Créer votre deuxième objet Track

Maintenant, créez un deuxième objet track avec la même structure :

```javascript
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 450,
        y: 350
    },
    buttonPosition: {
        x: 450,
        y: 200
    },
    buttonLabel: "Track 2"
};
```

**Logique de positionnement** :
- Bouton Track 1 à x : 150
- Bouton Track 2 à x : 450
- Même position y (200) pour qu'ils soient sur la même ligne
- Cela les place côte à côte

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de mise en page montrant deux boutons côte à côte]

**Testez !** Vous ne verrez rien encore, mais vos objets sont créés. Vérifiez la console pour toute erreur.

---

## Étape 2 : Charger les sons

### Comprendre le chargement des sons

Les sons doivent être chargés avant de pouvoir les jouer. Dans p5.js, nous utilisons la fonction `preload()` pour charger les sons avant que le programme ne démarre.

**Pourquoi preload() ?**
- Cela s'exécute avant `setup()`, garantissant que les sons sont prêts
- Cela empêche les erreurs d'essayer de jouer des sons qui ne sont pas chargés
- C'est la méthode standard pour charger les assets dans p5.js


### Étape 2 (A) : Charger les sons dans preload()

La fonction `preload()` s'exécute automatiquement avant `setup()`. C'est là que nous chargeons nos fichiers son :

```javascript
function preload() {
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}
```

**Comprendre le code** :
- [`loadSound('assets/sound1.mp3')`](https://p5js.org/reference/p5.sound/p5.SoundFile) charge le fichier son
- `track1.sound = ...` stocke le son chargé dans l'objet track1
- Le chemin `'assets/sound1.mp3'` signifie que le fichier est dans le dossier `assets`

**Organisation des fichiers** : Mettez vos fichiers son dans un dossier `assets` dans votre projet. Formats courants : WAV, MP3, OGG.

**Documentation** : [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) charge les fichiers son. Note : Vous devez inclure la bibliothèque p5.sound !

### Étape 2 (B) : Définir le volume initial dans setup()

Après avoir créé le canvas, définissez le volume initial pour les deux pistes :

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Comprendre le code** :
- [`setVolume()`](https://p5js.org/reference/p5.sound/p5.SoundFile/setVolume) définit le volume d'un son
- `track1.volume` est 0.5 (50%), donc le son commence à demi-volume
- Nous faisons cela pour que les sons soient prêts à jouer au bon volume

**Testez !** Les sons devraient se charger sans erreur. Vérifiez la console si quelque chose ne va pas.

---

## Étape 3 : Créer les boutons

### Comprendre les boutons

Les boutons sont des éléments interactifs qui répondent aux clics. Dans p5.js, vous pouvez créer des boutons en utilisant `createButton()`, qui gère automatiquement la détection des clics pour vous.

**Qu'est-ce qui fait fonctionner un bouton ?**
- Position : où il apparaît à l'écran
- Label : texte qui indique à l'utilisateur ce qu'il fait
- Gestionnaire de clic : ce qui se passe quand vous cliquez dessus

**Exemple du monde réel** : Un interrupteur :
- Position : sur le mur (emplacement spécifique)
- Label : peut-être "Lumière de la cuisine" ou "Lumière du salon" écrit dessus
- Action : allume/éteint les lumières quand on appuie

### Étape 3 (A) : Créer les boutons avec createButton()

Dans p5.js, vous pouvez créer des boutons en utilisant `createButton()`. Cela crée un élément bouton HTML qui gère automatiquement les clics. Ajoutez ceci à votre fonction `setup()` :

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Comprendre le code** :
- [`createButton(track1.buttonLabel)`](https://p5js.org/reference/p5/createButton) crée un bouton avec le texte du label
- `track1.button = ...` stocke le bouton dans l'objet track1
- [`position(x, y)`](https://p5js.org/reference/p5.Element/position) place le bouton à l'écran
- `track1.buttonPosition.x` et `track1.buttonPosition.y` utilisent la position de l'objet track

**Pourquoi utiliser createButton() ?**
- C'est plus simple que de dessiner les boutons manuellement
- Cela gère automatiquement la détection des clics
- Cela crée un vrai bouton HTML avec lequel les utilisateurs peuvent interagir

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant la création et le positionnement des boutons]

**Documentation** : [`createButton()`](https://p5js.org/reference/p5/createButton) crée un élément bouton.

**Testez !** Vous devriez voir deux boutons affichés à l'écran !

---

## Étape 4 : Créer les sliders de volume

### Comprendre les sliders

Les sliders sont des contrôles qui permettent aux utilisateurs d'ajuster une valeur en glissant. Chaque piste a besoin de son propre slider pour contrôler son volume.

**Qu'est-ce qui fait fonctionner un slider ?**
- Une plage de valeurs (minimum et maximum)
- Une valeur actuelle (où le slider est positionné)
- Une position à l'écran (où il apparaît)

**Exemple du monde réel** : Un bouton de volume sur une chaîne stéréo :
- Plage : de silencieux (0) à maximum (100%)
- Valeur actuelle : où le bouton est tourné
- Position : sur le panneau de contrôle de la chaîne

### Étape 4 (A) : Créer les sliders dans setup()

Dans p5.js, vous créez des sliders en utilisant `createSlider()`. Ajoutez ceci à votre fonction `setup()` après avoir créé les boutons :

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
    // Create volume slider for track 1
    track1.slider = createSlider(0, 100, 50);
    track1.slider.position(track1.sliderPosition.x, track1.sliderPosition.y);
    
    // Create volume slider for track 2
    track2.slider = createSlider(0, 100, 50);
    track2.slider.position(track2.sliderPosition.x, track2.sliderPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Comprendre le code** :
- [`createSlider(0, 100, 50)`](https://p5js.org/reference/p5/createSlider) crée un slider
  - `0` = valeur minimum
  - `100` = valeur maximum
  - `50` = valeur de départ (50%)
- `track1.slider = ...` stocke le slider dans l'objet track1
- [`position(100, 350)`](https://p5js.org/reference/p5.Element/position) place le slider à l'écran
- Positionnez le slider de track2 à (550, 350) pour le placer sous le bouton de track2

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de mise en page montrant les boutons et sliders positionnés pour chaque piste]

**Documentation** : [`createSlider()`](https://p5js.org/reference/p5/createSlider) crée un élément slider.

**Testez !** Vous devriez voir deux sliders à l'écran que vous pouvez faire glisser !

### Étape 4 (B) : Ajouter les labels de volume

Les utilisateurs doivent savoir ce que contrôlent les sliders. Ajoutez des labels dans votre fonction `draw()` :

```javascript
function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw buttons
    drawButton(track1.button);
    drawButton(track2.button);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
}
```

**Comprendre le code** :
- `text("Volume", 175, 330)` dessine "Volume" au-dessus du slider de track1
- `text("Volume", 625, 330)` dessine "Volume" au-dessus du slider de track2
- Positionnez-les centrés au-dessus de leurs sliders respectifs

**Testez !** Vous devriez voir les labels "Volume" au-dessus de chaque slider !

---

## Étape 5 : Fonctionnalité Play/Pause

### Comprendre la logique de bascule

Une bascule change entre deux états. Pour play/pause :
- Si en lecture → mettez en pause
- Si pas en lecture → jouez-le

**Analogie du monde réel** : Un interrupteur :
- Si la lumière est allumée → éteignez-la
- Si la lumière est éteinte → allumez-la

### Étape 5 (A) : Créer la fonction toggleTrack()

Créez une fonction qui bascule l'état de lecture d'une piste :

```javascript
function toggleTrack(track) {
    // If playing, pause it
    if (track.sound.isPlaying()) {
        track.sound.pause();
        track.isPlaying = false;
    } 
    // If not playing, play it
    else {
        track.sound.setVolume(track.volume);
        track.sound.setLoop(true);
        track.sound.play();
        track.isPlaying = true;
    }
}
```

**Comprendre le code** :
- `function toggleTrack(track)` - prend un objet track en entrée
- [`track.sound.isPlaying()`](https://p5js.org/reference/p5.sound/p5.SoundFile/isPlaying) vérifie si le son est en lecture
- Si en lecture :
  - [`pause()`](https://p5js.org/reference/p5.sound/p5.SoundFile/pause) arrête la lecture
  - `track.isPlaying = false` met à jour notre état
- Si pas en lecture :
  - [`setVolume(track.volume)`](https://p5js.org/reference/p5.sound/p5.SoundFile/setVolume) définit le volume
  - [`setLoop(true)`](https://p5js.org/reference/p5.sound/p5.SoundFile/setLoop) le fait boucler
  - [`play()`](https://p5js.org/reference/p5.sound/p5.SoundFile/play) démarre la lecture
  - `track.isPlaying = true` met à jour notre état

**Documentation** :
- [`.isPlaying()`](https://p5js.org/reference/p5.sound/p5.SoundFile/isPlaying) vérifie si le son est en lecture
- [`.pause()`](https://p5js.org/reference/p5.sound/p5.SoundFile/pause) met le son en pause
- [`.play()`](https://p5js.org/reference/p5.sound/p5.SoundFile/play) joue le son
- [`.setLoop()`](https://p5js.org/reference/p5.sound/p5.SoundFile/setLoop) fait boucler le son

### Étape 5 (B) : Connecter les boutons à la fonction de bascule

Quand vous créez des boutons avec `createButton()`, vous les connectez à des fonctions en utilisant `.mousePressed()`. Cela gère automatiquement la détection des clics pour vous. Mettez à jour votre fonction `setup()` :

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton("▶⏸");
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        toggleTrack(track1);
    });
    
    // Create play button for track 2
    track2.button = createButton("▶⏸");
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        toggleTrack(track2);
    });
    
    // ... (rest of setup code)
}
```

**Comprendre le code** :
- [`createButton()`](https://p5js.org/reference/p5/createButton) crée le bouton
- [`position()`](https://p5js.org/reference/p5.Element/position) le place à l'écran
- [`.mousePressed(function() { ... })`](https://p5js.org/reference/p5.Element/mousePressed) connecte une fonction aux clics de bouton
- Quand le bouton est cliqué, il appelle automatiquement `toggleTrack(track1)` ou `toggleTrack(track2)`

**Pourquoi cela fonctionne ?** La méthode `.mousePressed()` détecte automatiquement quand le bouton est cliqué et appelle votre fonction. Pas besoin de vérifier manuellement les coordonnées de la souris !

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant la connexion du bouton avec le callback mousePressed]

**Documentation** : [`.mousePressed()`](https://p5js.org/reference/p5.Element/mousePressed) connecte une fonction aux clics de bouton.

**Testez !** Cliquez sur les boutons - les sons devraient jouer et se mettre en pause !

---

## Étape 6 : Contrôle du volume

### Comprendre les mises à jour en temps réel

Le volume doit se mettre à jour continuellement pendant que l'utilisateur déplace le slider. Cela se produit dans la fonction `draw()`, qui s'exécute plusieurs fois par seconde.

**La logique** :
1. Lisez la valeur actuelle du slider
2. Convertissez-la en volume (0.0 à 1.0)
3. Appliquez-la au son s'il est en lecture

### Étape 6 (A) : Lire les valeurs des sliders

Les sliders retournent des valeurs de 0 à 100, mais les sons ont besoin de valeurs de 0.0 à 1.0. Mettez à jour votre fonction `draw()` :

```javascript
function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 210, 330);
    text("Volume", 510, 330);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
}
```

**Comprendre le code** :
- [`track1.slider.value()`](https://p5js.org/reference/p5.Element/value) obtient la valeur actuelle du slider (0-100)
- Diviser par 100 le convertit en 0.0-1.0 (donc 50 devient 0.5)
- `track1.volume = ...` stocke le volume mis à jour
- Cela s'exécute à chaque frame, donc le volume se met à jour en temps réel

**Pourquoi diviser par 100 ?** Les sliders utilisent 0-100 (pourcentage), mais les sons utilisent 0.0-1.0 (décimal). Diviser convertit entre eux.

### Étape 6 (B) : Appliquer le volume aux sons en lecture

Maintenant, appliquez le volume aux sons qui sont actuellement en lecture :

```javascript
function draw() {
    background(255);
    
    // ... (all the drawing code from before) ...
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Apply volume to playing sounds
    if (track1.sound.isPlaying()) {
        track1.sound.setVolume(track1.volume);
    }
    if (track2.sound.isPlaying()) {
        track2.sound.setVolume(track2.volume);
    }
}
```

**Comprendre le code** :
- Vérifiez si le son de chaque piste est en lecture
- Si en lecture, mettez à jour son volume en utilisant `setVolume()`
- Cela se produit à chaque frame, donc le volume change en douceur pendant que vous déplacez le slider

**Pourquoi vérifier si en lecture ?** Pas besoin de mettre à jour le volume si le son n'est pas en lecture.

**Testez !** Déplacez les sliders pendant que les sons jouent - le volume devrait changer en temps réel !

---

## Tout mettre ensemble

### Le flux complet

Votre table de mixage devrait maintenant fonctionner comme ceci :

1. **preload()** : Charger les fichiers son dans les objets track
2. **setup()** :
   - Créer le canvas
   - Créer les sliders
   - Définir le volume initial
3. **draw()** (s'exécute en continu) :
   - Dessiner le titre
   - Dessiner les boutons
   - Dessiner les labels de volume
   - Mettre à jour le volume depuis les sliders
   - Appliquer le volume aux sons en lecture
4. **mousePressed()** : Quand un bouton est cliqué, basculez cette piste

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de flux montrant le flux complet du programme]

### Tester votre table de mixage

Testez chaque fonctionnalité :
- ✅ Cliquez sur le bouton track1 → sound1 joue
- ✅ Cliquez à nouveau sur le bouton track1 → sound1 se met en pause
- ✅ Cliquez sur le bouton track2 → sound2 joue
- ✅ Les deux pistes peuvent jouer en même temps (mixage !)
- ✅ Déplacez le slider track1 → le volume de track1 change
- ✅ Déplacez le slider track2 → le volume de track2 change
- ✅ Les sons bouclent continuellement

### Dépannage

**Pas de son ?**
- Vérifiez que la bibliothèque p5.sound est incluse
- Vérifiez que les fichiers son sont dans le dossier `assets`
- Vérifiez la console du navigateur pour les erreurs

**Les boutons ne fonctionnent pas ?**
- Vérifiez que la logique de détection des clics est correcte
- Vérifiez que les positions des boutons correspondent à votre détection des clics
- Ajoutez `console.log()` pour voir si `mousePressed()` est appelé

**Le volume ne change pas ?**
- Vérifiez que vous lisez les valeurs des sliders dans `draw()`
- Vérifiez que vous appliquez le volume aux sons en lecture
- Vérifiez que la conversion de volume (diviser par 100) est correcte

---

## Idées de personnalisation

Maintenant que votre table de mixage fonctionne, essayez de la personnaliser :

- **Changez les positions et tailles des boutons**
- **Changez les positions des sliders**
- **Ajoutez un titre ou des labels**
- **Changez les couleurs**
- **Ajoutez plus de pistes**
- **Ajoutez un retour visuel quand les pistes jouent**

**Rappelez-vous** : L'expérimentation est la façon dont on apprend ! Essayez des choses, voyez ce qui se passe, et apprenez-en.

---

## Félicitations !

Vous avez construit une table de mixage DJ fonctionnelle ! Vous avez appris :
- Comment organiser le code en utilisant des objets
- Comment charger et jouer plusieurs sons
- Comment créer des boutons interactifs
- Comment créer et utiliser des sliders
- Comment contrôler le volume en temps réel
- Comment mélanger les sons ensemble

Ces concepts vous aideront à construire des applications interactives encore plus complexes !

---

## Étape 7 : Configurer le système de grille et le design responsive

### Comprendre le système de grille

Pour faciliter le positionnement et supporter les appareils mobiles, nous allons diviser le canvas en une grille 6x6. Cela signifie que nous diviserons l'écran en 6 colonnes et 6 lignes, ce qui facilite le positionnement précis des éléments d'interface et garantit qu'ils fonctionnent sur différentes tailles d'écran.

**Le concept** : Au lieu de calculer manuellement les positions en pixels comme `width / 6` ou `2 * height / 6`, vous pouvez créer des fonctions utilitaires qui convertissent les coordonnées de la grille (comme colonne 1, ligne 2) directement en coordonnées pixels.

**Pourquoi ?** Cela rend le positionnement beaucoup plus facile ! Au lieu d'écrire `width / 6` à chaque fois, vous pouvez simplement écrire `gridX(1)` pour la colonne 1, ou `gridY(2)` pour la ligne 2. De plus, cela rend votre application compatible avec les appareils mobiles !

### Étape 7 (A) : Utiliser la taille complète de la fenêtre pour le canvas

**Ce que vous devez faire** : Mettez à jour votre appel `createCanvas()` dans `setup()` pour utiliser la taille complète de la fenêtre du navigateur au lieu d'une taille fixe.

Trouvez où vous avez `createCanvas(800, 600)` et changez-le pour utiliser `windowWidth` et `windowHeight` à la place. Remplacez les nombres fixes `800` et `600` par `windowWidth` et `windowHeight`.

**Pourquoi utiliser `windowWidth` et `windowHeight` ?**

Utiliser `windowWidth` et `windowHeight` fait que votre table de mixage remplit automatiquement toute la fenêtre du navigateur, s'adaptant à n'importe quelle taille d'écran. Cela signifie :
- Votre table de mixage fonctionnera bien sur différentes tailles d'écran (ordinateur, tablette, mobile)
- Elle utilise automatiquement tout l'espace disponible
- Les utilisateurs n'ont pas besoin de redimensionner leur navigateur ou de voir de l'espace vide autour du canvas
- Cela offre une meilleure expérience utilisateur, plus professionnelle
- **Vous pouvez la publier comme application mobile !**

**Documentation** :
- [`windowWidth`](https://p5js.org/reference/p5/windowWidth/) - stocke la largeur de la fenêtre d'affichage du navigateur
- [`windowHeight`](https://p5js.org/reference/p5/windowHeight/) - stocke la hauteur de la fenêtre d'affichage du navigateur

**Important** : Puisque votre canvas s'adaptera maintenant à la taille de la fenêtre, tous vos éléments UI s'adapteront automatiquement avec le système de grille que vous allez créer !

### Étape 7 (B) : Créer des fonctions utilitaires pour la grille

**Ce que vous devez faire** : Créez deux fonctions utilitaires qui convertissent les coordonnées de la grille en positions pixels :

1. `gridX(cellX)` - Prend un numéro de colonne (0-5) et retourne la position X en pixels
2. `gridY(cellY)` - Prend un numéro de ligne (0-5) et retourne la position Y en pixels

**La logique** :
- Pour une grille de 6 colonnes, la colonne 0 commence à la position X 0, la colonne 1 est à `width / 6`, la colonne 2 est à `2 * width / 6`, etc.
- Pour une grille de 6 lignes, la ligne 0 commence à la position Y 0, la ligne 1 est à `height / 6`, la ligne 2 est à `2 * height / 6`, etc.

**Exemple** :
- `gridX(0)` retourne `0` (bord gauche)
- `gridX(1)` retourne `width / 6` (colonne 1)
- `gridX(3)` retourne `3 * width / 6` (colonne 3)
- `gridY(0)` retourne `0` (bord supérieur)
- `gridY(1)` retourne `height / 6` (ligne 1)
- `gridY(2)` retourne `2 * height / 6` (ligne 2)

**Indice** : Utilisez la multiplication ! `gridX(cellX)` devrait retourner `cellX * width / 6`.

**Comment l'implémenter** :
- Créez une fonction appelée `gridX` qui prend un paramètre (le numéro de colonne) et retourne la position X en pixels en multipliant le numéro de colonne par `width / 6`
- Créez une fonction appelée `gridY` qui prend un paramètre (le numéro de ligne) et retourne la position Y en pixels en multipliant le numéro de ligne par `height / 6`

**Utilisez cela tout au long de l'atelier !** Chaque fois que vous devez positionner des éléments UI, utilisez `gridX()` et `gridY()` au lieu de calculer manuellement les positions.

### Étape 7 (C) : Mettre à jour la visualisation de la grille

**Ce que vous devez faire** : Mettez à jour votre fonction `drawGrid()` existante pour utiliser les nouvelles fonctions utilitaires `gridX()` et `gridY()`.

**La logique** :
- Utilisez vos fonctions `gridX()` et `gridY()` dans le code de dessin de la grille
- Faites une boucle de 1 à 5 et dessinez des lignes à `gridX(i)` et `gridY(i)`

**Astuce** : Cela rend votre code de grille plus propre et plus facile à comprendre !

### Étape 7 (D) : Repositionner les éléments UI existants en utilisant la grille

**Ce que vous devez faire** : Mettez à jour vos éléments UI existants pour utiliser le système de grille.

**Repositionnez-les en utilisant vos fonctions utilitaires de grille** :
- Bouton piste 1 : Colonne 1, Ligne 2 (utilisez `gridX(1)`, `gridY(2)`)
- Slider piste 1 : Colonne 1, Ligne 3 (utilisez `gridX(1)`, `gridY(3)`)
- Bouton piste 2 : Colonne 4, Ligne 2 (utilisez `gridX(4)`, `gridY(2)`)
- Slider piste 2 : Colonne 4, Ligne 3 (utilisez `gridX(4)`, `gridY(3)`)
- Titre : Centre (utilisez `width / 2`, `gridY(1) / 2`)
- Labels de volume : Au-dessus des sliders (utilisez `gridX(1)`, `gridY(3) - 20` et `gridX(4)`, `gridY(3) - 20`)

**Mettez à jour vos calculs de position** pour utiliser `gridX()` et `gridY()` au lieu de calculer manuellement `width / 6` ou `height / 6`.

**Important** : Utilisez le système de grille pour tout le positionnement UI à partir de maintenant ! Cela rendra beaucoup plus facile d'ajouter de nouveaux éléments plus tard.

**Testez !** Assurez-vous que tous vos boutons et sliders existants fonctionnent toujours et sont correctement positionnés sur la grille. Essayez de redimensionner la fenêtre du navigateur - tout devrait s'adapter !

---

## Étape 8 : Ajouter l'upload d'images de fond

### Comprendre les uploads de fichiers

Les uploads de fichiers permettent aux utilisateurs de sélectionner des fichiers depuis leur ordinateur et de les utiliser dans votre programme. Pensez-y comme choisir une photo à uploader sur les réseaux sociaux - vous cliquez sur un bouton, sélectionnez un fichier, et il devient partie de l'application.

**Comment cela fonctionne** :
1. Vous créez un bouton de saisie de fichier
2. L'utilisateur clique sur le bouton
3. Un navigateur de fichiers s'ouvre
4. L'utilisateur sélectionne un fichier
5. Votre programme reçoit des informations sur le fichier
6. Vous pouvez ensuite charger et utiliser ce fichier

**Documentation** : [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) crée un bouton d'upload de fichier.

### Étape 8 (A) : Créer une variable pour l'image de fond

D'abord, vous avez besoin d'un endroit pour stocker l'image uploadée. En haut de votre code (avant les objets track), créez une variable pour stocker l'image de fond.

Réfléchissez à la valeur initiale - nous n'avons pas encore d'image, donc quelle devrait être la valeur initiale ? Utilisez `null` pour représenter "pas d'image encore".

**Compréhension** :
- Vous créez une variable pour stocker l'image
- `null` signifie "pas d'image encore" - nous la définirons quand un utilisateur upload une image
- `null` est une valeur spéciale qui signifie "rien" ou "vide"

**Pourquoi `null` ?** C'est une façon de dire "nous n'avons pas encore d'image, mais nous en aurons plus tard." C'est utile pour vérifier si une image a été uploadée.

### Étape 8 (B) : Créer le bouton de saisie de fichier

Dans votre fonction `setup()`, après avoir créé le canvas, créez un bouton de saisie de fichier pour les images.

Réfléchissez à :
1. Quelle fonction devrait s'exécuter quand un fichier est sélectionné ? (C'est la fonction de gestion)
2. Où ce bouton devrait-il être positionné à l'écran ? (Utilisez vos fonctions `gridX()` et `gridY()` !)
3. Comment pouvez-vous restreindre la sélection de fichiers aux images uniquement ?

Créez le bouton de saisie de fichier en utilisant `createFileInput()` et passez-lui le nom d'une fonction de gestion qui sera appelée quand un fichier est sélectionné. Positionnez-le à l'écran en utilisant la méthode `position()` avec vos fonctions utilitaires de grille. Utilisez la méthode `attribute()` pour restreindre la sélection de fichiers aux images uniquement en définissant `'accept'` à `'image/*'`.

**Documentation** :
- [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) crée un bouton d'upload de fichier
- [`.position()`](https://p5js.org/reference/p5.Element/position) place les éléments à l'écran
- [`.attribute()`](https://p5js.org/reference/p5.Element/attribute) définit les attributs HTML

**Testez !** Vous devriez voir un bouton "Choisir un fichier". Essayez de cliquer dessus - un navigateur de fichiers devrait s'ouvrir !

### Étape 8 (C) : Créer la fonction de gestion

Quand un utilisateur sélectionne un fichier image, vous avez besoin d'une fonction pour le gérer. Créez une fonction qui gère quand un utilisateur sélectionne un fichier image.

Réfléchissez à :
1. Quelles informations cette fonction recevra-t-elle sur le fichier sélectionné ?
2. Comment pouvez-vous vérifier si le fichier est réellement une image (pas un autre type) ?
3. Si c'est une image, comment la chargez-vous et la stockez-vous dans votre variable ?

La fonction sera appelée automatiquement par p5.js quand un fichier est sélectionné. Elle reçoit un objet fichier qui contient des informations sur le fichier sélectionné, y compris les données du fichier que vous pouvez utiliser pour charger l'image. Vérifiez `file.type` pour voir si c'est une image, et si c'est le cas, utilisez `loadImage()` pour charger l'image depuis `file.data` et la stocker dans votre variable `bgImage`.

**Documentation** : [`loadImage()`](https://p5js.org/reference/p5/loadImage) charge les fichiers image.

**Pourquoi vérifier le type de fichier ?** Les utilisateurs pourraient accidentellement sélectionner le mauvais type de fichier. Cette vérification prévient les erreurs.

**Testez !** Essayez d'uploader une image - le fichier devrait être sélectionné !

### Étape 8 (D) : Afficher l'image de fond

Maintenant, vous devez afficher l'image uploadée comme fond. Dans votre fonction `draw()`, au tout début, vous devez décider quoi dessiner comme fond.

Réfléchissez à :
1. Comment pouvez-vous vérifier si une image a été uploadée ?
2. Si une image existe, comment la dessinez-vous pour remplir tout le canvas ?
3. Si aucune image n'existe encore, quel devrait être le fond ?

C'est une vérification conditionnelle - si nous avons une image, utilisez-la ; sinon, utilisez le fond blanc par défaut. Cela se produit à chaque frame dans `draw()`, donc le fond sera mis à jour immédiatement quand une image est uploadée. Utilisez la fonction `image()` pour dessiner l'image, et positionnez-la à `(0, 0)` avec la taille `width` et `height` pour remplir tout le canvas.

**Documentation** : [`image()`](https://p5js.org/reference/p5/image) dessine les images.

**Testez !** Uploadez une image - elle devrait maintenant apparaître comme fond, remplissant tout le canvas !

---

## Étape 9 : Ajouter l'upload de sons pour les pistes

### Comprendre les uploads de sons

Maintenant, vous voulez que les utilisateurs uploadent leurs propres sons pour chaque piste. C'est similaire aux uploads d'images, mais pour les fichiers audio.

**La logique** :
1. Ajoutez une propriété file input à l'objet track
2. Créez un bouton de saisie de fichier dans `setup()`
3. Quand un fichier est sélectionné, gérez-le
4. Chargez le son et remplacez celui existant

### Étape 9 (A) : Ajouter la propriété File Input aux objets Track

Chaque piste doit stocker son bouton de saisie de fichier. Dans les objets `track1` et `track2`, ajoutez :

```javascript
fileInput: null
```

**Comprendre le code** :
- `fileInput: null` - nous stockerons le bouton de saisie de fichier ici plus tard
- Juste comme `slider: null` et `button: null`, cela stocke un élément UI

### Étape 9 (B) : Créer les boutons de saisie de fichier

Dans votre fonction `setup()`, après avoir créé le bouton de saisie de fichier pour l'image de fond, créez des boutons de saisie de fichier pour les sons des deux pistes.

Réfléchissez à :
1. Quelle fonction devrait s'exécuter quand un fichier est sélectionné ? (Vous devrez passer à la fois le fichier et pour quelle piste c'est)
2. Où ces boutons devraient-ils être positionnés ? (Utilisez votre système de grille !)
3. Comment pouvez-vous restreindre la sélection de fichiers aux fichiers audio uniquement ?

Créez le bouton de saisie de fichier en utilisant `createFileInput()` avec une fonction qui appelle votre gestionnaire d'upload de son, passant à la fois le fichier et l'objet track. Positionnez-les en utilisant vos fonctions utilitaires de grille, et restreignez la sélection de fichiers aux fichiers audio uniquement en utilisant `'accept', 'audio/*'`.

**Pourquoi passer l'objet track ?** Pour que la fonction de gestion sache quelle piste mettre à jour. Cela nous permet d'utiliser le même gestionnaire pour les deux pistes !

**Testez !** Vous devriez voir des boutons de saisie de fichier pour les deux pistes !

### Étape 9 (C) : Créer le gestionnaire d'upload de son

Créez une fonction qui gère quand un utilisateur sélectionne un fichier audio. Réfléchissez à :
1. De quelles informations cette fonction a-t-elle besoin ? (Le fichier, et pour quelle piste c'est)
2. Comment pouvez-vous vérifier si le fichier est réellement un fichier audio ?
3. S'il y a déjà un son en lecture, que devrait-il se passer ?
4. Comment chargez-vous le nouveau son et le rendez-vous prêt à jouer ?

Cette fonction doit gérer le remplacement d'un son existant. Si un son est actuellement en lecture, vous devriez d'abord l'arrêter. Ensuite, chargez le nouveau son et configurez-le avec le volume correct pour qu'il soit prêt à jouer. Vérifiez `file.type` pour voir si c'est un fichier audio, et si c'est le cas, arrêtez tout son actuellement en lecture sur cette piste, chargez le nouveau son depuis `file.data` en utilisant `loadSound()`, et définissez son volume en utilisant `setVolume()`.

**Documentation** : [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) charge les fichiers son.

**Pourquoi arrêter le son actuel ?** Si un son est en lecture quand un nouveau est uploadé, nous devrions d'abord l'arrêter. Sinon, les deux sons pourraient jouer en même temps, ou l'ancien son pourrait continuer à jouer.

**Testez !** Uploadez des fichiers audio pour les deux pistes - ils devraient remplacer les sons par défaut ! Essayez de les jouer pour vous assurer qu'ils fonctionnent.

---

## Étape 10 : Ajouter le support tactile pour mobile

### Comprendre les événements tactiles

Pour les appareils mobiles, vous devez gérer les événements tactiles différemment des clics de souris. Cela garantit que vos boutons fonctionnent correctement sur les téléphones et tablettes.

**La logique** : Les événements tactiles peuvent déclencher à la fois les événements tactiles et les événements souris sur les appareils mobiles, causant un double-clic sur les boutons. Nous devons empêcher ce double-déclenchement.

### Étape 10 (A) : Ajouter les variables de support tactile

**Ce que vous devez faire** : En haut de votre code, ajoutez des variables pour suivre l'utilisation du tactile :
- `touchUsed` - un booléen pour suivre si le tactile a été récemment utilisé
- `touchTimeout` - une variable pour stocker le timeout

### Étape 10 (B) : Mettre à jour les gestionnaires tactiles des boutons

**Ce que vous devez faire** : Pour chaque bouton, ajoutez un gestionnaire `touchStarted()` qui :
1. Définit `touchUsed = true` pour empêcher les événements souris de se déclencher
2. Appelle la fonction de bascule
3. Efface le drapeau après un délai
4. Empêche l'événement souris par défaut

**Comprendre le code** :
- `.touchStarted()` gère les événements tactiles sur le bouton
- Nous empêchons le double-déclenchement en vérifiant `touchUsed` dans `mousePressed()`
- `setTimeout()` efface le drapeau après 400ms
- `preventDefault()` arrête l'événement souris de se déclencher

**Testez !** Essayez votre table de mixage sur un appareil mobile - les boutons devraient fonctionner en douceur sans double-déclenchement !

---

## Étape 11 : Ajouter des labels et améliorer l'expérience utilisateur

### Ajouter des labels

**La logique** : Les utilisateurs doivent savoir ce que fait chaque bouton de saisie de fichier.

**Ce que vous devez faire** : Dans votre fonction `draw()`, ajoutez des labels de texte au-dessus de chaque bouton de saisie de fichier. Réfléchissez à :
1. Quel texte chaque label devrait-il dire ?
2. Où chaque label devrait-il être positionné ? (Juste au-dessus de son bouton correspondant)
3. Comment le texte devrait-il être aligné ?

Utilisez une taille de texte responsive : `textSize(min(width, height) * 0.025)` pour que les labels s'adaptent à la taille de l'écran.

**Testez !** Les labels devraient rendre clair ce que fait chaque bouton !

### Gérer les cas limites

Assurez-vous que votre code gère les situations où les choses pourraient mal tourner. Mettez à jour votre fonction `toggleTrack()` pour vérifier si le son existe avant d'essayer de le jouer.

Réfléchissez à :
1. Que se passe-t-il si un utilisateur clique sur play avant d'uploader un son ?
2. Comment pouvez-vous vérifier si un son existe avant d'essayer de l'utiliser ?

Avant d'utiliser quelque chose (comme un son), vérifiez d'abord s'il existe. Cela prévient les erreurs et rend votre programme plus robuste. C'est ce qu'on appelle la "programmation défensive" - vérifier les problèmes potentiels avant qu'ils ne causent des crashes.

Mettez également à jour votre fonction `draw()` pour vérifier si les sons existent avant de les utiliser. Quand vous appliquez des changements de volume, vérifiez d'abord si le son existe et s'il est en lecture, puis appliquez le volume. Cela prévient les erreurs si un son n'a pas encore été uploadé.

**Compréhension** :
- Vérifiez si le son existe ET est en lecture avant d'essayer de l'utiliser
- L'opérateur `&&` signifie "les deux conditions doivent être vraies"
- Cela prévient les erreurs si un son n'a pas encore été uploadé

**Pourquoi gérer les cas limites ?** Les utilisateurs pourraient faire des choses inattendues (comme cliquer sur play avant d'uploader un son). Votre programme devrait gérer cela gracieusement au lieu de planter.

**Testez !** Essayez de cliquer sur les boutons play avant d'uploader des sons - le programme devrait le gérer gracieusement sans erreurs !

---

## Tout mettre ensemble (Mis à jour)

### Le flux complet

Votre table de mixage devrait maintenant fonctionner comme ceci :

1. **preload()** : Charger les fichiers son dans les objets track
2. **setup()** : 
   - Créer le canvas (taille responsive)
   - Créer les boutons avec support tactile
   - Créer les sliders
   - Créer les file inputs
   - Définir le volume initial
3. **draw()** (s'exécute en continu) :
   - Dessiner le fond (image ou blanc)
   - Dessiner la grille
   - Dessiner le titre
   - Dessiner les labels
   - Mettre à jour le volume depuis les sliders
   - Appliquer le volume aux sons en lecture
4. **Détection des clics/tactiles** : Quand un bouton est cliqué ou touché, basculez l'état de lecture de cette piste
5. **Uploads de fichiers** : Les utilisateurs peuvent uploader des images de fond et des sons pour les pistes

### Tester votre table de mixage (Mis à jour)

Testez chaque fonctionnalité :
- ✅ Cliquez sur le bouton track1 → sound1 joue
- ✅ Cliquez à nouveau sur le bouton track1 → sound1 se met en pause
- ✅ Cliquez sur le bouton track2 → sound2 joue
- ✅ Les deux pistes peuvent jouer en même temps (mixage !)
- ✅ Déplacez le slider track1 → le volume de track1 change
- ✅ Déplacez le slider track2 → le volume de track2 change
- ✅ Les sons bouclent continuellement
- ✅ Uploadez une image de fond → elle s'affiche comme fond
- ✅ Uploadez un son pour la piste 1 → il remplace le son par défaut
- ✅ Uploadez un son pour la piste 2 → il remplace le son par défaut
- ✅ Touchez les boutons sur mobile → ils fonctionnent sans double-déclenchement
- ✅ Redimensionnez la fenêtre du navigateur → tout s'adapte correctement

### Dépannage (Mis à jour)

**Pas de son ?**
- Vérifiez que la bibliothèque p5.sound est incluse
- Vérifiez que les fichiers son sont dans le dossier `assets` ou ont été uploadés
- Vérifiez la console du navigateur pour les erreurs

**Les boutons ne fonctionnent pas ?**
- Vérifiez que la logique de détection des clics est correcte
- Vérifiez que les positions des boutons correspondent à votre détection des clics
- Sur mobile, vérifiez que les événements tactiles sont correctement gérés

**Le volume ne change pas ?**
- Vérifiez que vous lisez les valeurs des sliders dans `draw()`
- Vérifiez que vous appliquez le volume aux sons en lecture
- Vérifiez que la conversion de volume (diviser par 100) est correcte

**L'image ne s'affiche pas après l'upload**
- Vérifiez que vous utilisez `image()` dans `draw()` et que vous vérifiez si `bgImage` existe

**Le son ne joue pas après l'upload**
- Assurez-vous que vous appelez `loadSound(file.data)` et que vous définissez le volume

---

## Idées de personnalisation (Mis à jour)

Maintenant que votre table de mixage fonctionne, essayez de la personnaliser :

- **Uploadez vos chansons préférées**
- **Uploadez des images de fond personnalisées**
- **Changez les positions et tailles des boutons**
- **Changez les positions des sliders**
- **Ajoutez un titre ou des labels**
- **Changez les couleurs**
- **Ajoutez plus de pistes**
- **Ajoutez un retour visuel quand les pistes jouent**
- **Partagez votre table de mixage comme application mobile !**

**Rappelez-vous** : L'expérimentation est la façon dont on apprend ! Essayez des choses, voyez ce qui se passe, et apprenez-en.

---

## Félicitations ! 🎉

Vous avez construit une table de mixage DJ entièrement fonctionnelle et personnalisable qui fonctionne sur ordinateur et mobile ! Vous avez appris :
- Comment organiser le code en utilisant des objets
- Comment charger et jouer plusieurs sons
- Comment créer des boutons interactifs avec support tactile
- Comment créer et utiliser des sliders
- Comment contrôler le volume en temps réel
- Comment mélanger les sons ensemble
- Comment utiliser un système de grille pour une mise en page responsive
- Comment gérer les uploads de fichiers (images et sons)
- Comment créer des interfaces compatibles mobile
- Comment publier votre application comme application mobile !

Ces concepts vous aideront à construire des applications interactives encore plus complexes !

