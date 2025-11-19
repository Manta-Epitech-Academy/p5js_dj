# Guide étape par étape : Ajouter la personnalisation à votre table de mixage DJ

Ce guide vous accompagne dans l'ajout de fonctionnalités d'upload de fichiers à votre table de mixage DJ. Vous apprendrez comment permettre aux utilisateurs d'uploader leurs propres images de fond et sons !

---

## Introduction : Comprendre la personnalisation

### Ce que nous ajoutons

Nous allons ajouter des fonctionnalités de personnalisation qui permettent aux utilisateurs de :
- Uploader leurs propres images de fond
- Uploader leurs propres sons pour chaque piste
- Personnaliser leur expérience de table de mixage DJ


### Concepts clés

**Uploads de fichiers** : Les uploads de fichiers permettent aux utilisateurs de sélectionner des fichiers depuis leur ordinateur et de les utiliser dans votre programme. C'est ainsi que les sites web vous permettent d'envoyer des photos, des documents, ou dans notre cas, des sons et des images.

**Éléments File Input** : Ce sont des éléments HTML qui créent un bouton "Choisir un fichier". Quand on clique dessus, ils ouvrent un navigateur de fichiers pour que les utilisateurs puissent sélectionner des fichiers.

**Gestion des fichiers** : Une fois qu'un fichier est sélectionné, vous devez le charger et l'utiliser dans votre programme. Différents types de fichiers (images vs. sons) nécessitent une gestion différente.

---

## Étape 1 : Configurer le système de grille

### Comprendre le système de grille

Pour faciliter le positionnement, nous choisissons de diviser le canvas en une grille 6x6. Cela signifie que nous divisons l'écran en 6 colonnes et 6 lignes, ce qui facilite le positionnement précis des éléments d'interface.

**Le concept** : Au lieu de calculer manuellement les positions en pixels comme `width / 6` ou `2 * height / 6`, vous pouvez créer des fonctions utilitaires qui convertissent les coordonnées de la grille (comme colonne 1, ligne 2) directement en coordonnées pixels.

**Pourquoi ?** Cela rend le positionnement beaucoup plus facile ! Au lieu d'écrire `width / 6` à chaque fois, vous pouvez simplement écrire `gridX(1)` pour la colonne 1, ou `gridY(2)` pour la ligne 2.

### Étape 1A : Utiliser la taille complète de la fenêtre pour le canvas

**Ce que vous devez faire** : Mettez à jour votre appel `createCanvas()` dans `setup()` pour utiliser la taille complète de la fenêtre du navigateur au lieu d'une taille fixe.

Trouvez où vous avez `createCanvas(800, 600)` et changez-le pour utiliser `windowWidth` et `windowHeight` à la place. Remplacez les nombres fixes `800` et `600` par `windowWidth` et `windowHeight`.

**Pourquoi utiliser `windowWidth` et `windowHeight` ?**

Utiliser `windowWidth` et `windowHeight` fait que votre table de mixage remplit automatiquement toute la fenêtre du navigateur, s'adaptant à n'importe quelle taille d'écran. Cela signifie :
- Votre table de mixage fonctionnera bien sur différentes tailles d'écran (ordinateur, tablette, mobile)
- Elle utilise automatiquement tout l'espace disponible
- Les utilisateurs n'ont pas besoin de redimensionner leur navigateur ou de voir de l'espace vide autour du canvas
- Cela offre une meilleure expérience utilisateur, plus professionnelle

**Documentation** :
- [`windowWidth`](https://p5js.org/reference/p5/windowWidth/) - stocke la largeur de la fenêtre d'affichage du navigateur
- [`windowHeight`](https://p5js.org/reference/p5/windowHeight/) - stocke la hauteur de la fenêtre d'affichage du navigateur

**Important** : Puisque votre canvas s'adaptera maintenant à la taille de la fenêtre, tous vos éléments UI s'adapteront automatiquement avec le système de grille que vous allez créer !

### Étape 1B : Créer des fonctions utilitaires pour la grille

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

**Utilisez cela tout au long de l'atelier !** Chaque fois que vous devez positionner des éléments d'interface, utilisez `gridX()` et `gridY()` au lieu de calculer manuellement les positions. Par exemple :
- Au lieu de calculer manuellement `width / 6`, appelez `gridX(1)`
- Au lieu de calculer manuellement `2 * height / 6`, appelez `gridY(2)`

### Étape 1C : Ajouter une visualisation de la grille (Optionnel)

**Ce que vous devez faire** : Créez une fonction `drawGrid()` qui dessine les lignes de la grille sur le canvas. Cela vous aide à voir où se trouvent les cellules de la grille pendant que vous positionnez les éléments.

**La logique** :
- Dessinez des lignes verticales à `width / 6`, `2 * width / 6`, `3 * width / 6`, `4 * width / 6`, `5 * width / 6`
- Dessinez des lignes horizontales à `height / 6`, `2 * height / 6`, `3 * height / 6`, `4 * height / 6`, `5 * height / 6`
- Utilisez une couleur gris clair pour qu'elle soit visible mais pas distrayante

**Astuce** : Vous pouvez utiliser vos fonctions `gridX()` et `gridY()` ici ! Faites une boucle de 1 à 5 et dessinez des lignes à `gridX(i)` et `gridY(i)`.

Appelez `drawGrid()` dans votre fonction `draw()` pour voir la grille.

### Étape 1D : Repositionner les éléments UI existants en utilisant la grille

**Ce que vous devez faire** : Mettez à jour vos éléments UI existants de la Partie 1 pour utiliser le système de grille.

De la Partie 1, vous avez :
- Bouton et slider de la piste 1
- Bouton et slider de la piste 2

**Repositionnez-les en utilisant vos fonctions utilitaires de grille** :
- Bouton piste 1 : Colonne 1, Ligne 2 (utilisez `gridX(1)`, `gridY(2)`)
- Slider piste 1 : Colonne 1, Ligne 3 (utilisez `gridX(1)`, `gridY(3)`)
- Bouton piste 2 : Colonne 4, Ligne 2 (utilisez `gridX(4)`, `gridY(2)`)
- Slider piste 2 : Colonne 4, Ligne 3 (utilisez `gridX(4)`, `gridY(3)`)
- Titre : Centre (utilisez `width / 2`, `gridY(0)`)
- Labels de volume : Au-dessus des sliders (utilisez `gridX(1)`, `gridY(3) - 20` et `gridX(4)`, `gridY(3) - 20`)

**Mettez à jour vos calculs de position** (ou l'endroit où vous définissez les positions) pour utiliser `gridX()` et `gridY()` au lieu de calculer manuellement `width / 6` ou `height / 6`.

**Important** : Utilisez le système de grille pour tout le positionnement UI à partir de maintenant ! Cela rendra beaucoup plus facile d'ajouter de nouveaux éléments plus tard.

**Testez !** Assurez-vous que tous vos boutons et sliders existants fonctionnent toujours et sont correctement positionnés sur la grille.

---

## Étape 2 : Comprendre les uploads de fichiers

### Qu'est-ce qu'un upload de fichier ?

Un upload (de "envoyer" un fichier) est un moyen pour les utilisateurs de sélectionner des fichiers depuis leur ordinateur et de les utiliser dans votre application web. Dans p5.js, vous utilisez `createFileInput()` pour que cela se produise.

**Comment ça fonctionne** :
1. Vous créez un bouton de saisie de fichier
2. L'utilisateur clique sur le bouton
3. Un navigateur de fichiers s'ouvre
4. L'utilisateur sélectionne un fichier
5. Votre programme reçoit des informations sur le fichier
6. Vous pouvez ensuite charger et utiliser ce fichier

### Types de fichiers

Différents fichiers ont différents types :
- **Images** : JPG, PNG, GIF, etc.
- **Audio** : MP3, WAV, OGG, etc.

Vous pouvez restreindre les file inputs pour n'accepter que certains types en utilisant l'attribut `accept`.

**Documentation** : [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) crée un bouton d'upload de fichier.

---

## Étape 3 : Ajouter l'upload d'image de fond

### Étape 3 (A) : Créer une variable pour l'image de fond

D'abord, vous avez besoin d'un endroit pour stocker l'image uploadée. En haut de votre code (avant les objets track), créez une variable pour stocker l'image de fond.

Réfléchissez à la valeur qu'elle devrait avoir au début - nous n'avons pas encore d'image, donc quelle devrait être la valeur initiale ? Utilisez `null` pour représenter "pas d'image encore".

**Comprendre** :
- Vous créez une variable pour stocker l'image
- `null` signifie "pas d'image encore" - nous la définirons quand un utilisateur uploade une image
- `null` est une valeur spéciale qui signifie "rien" ou "vide"

**Pourquoi `null` ?** C'est une façon de dire "nous n'avons pas encore d'image, mais nous en aurons plus tard." C'est utile pour vérifier si une image a été téléchargée.

### Étape 3 (B) : Créer le bouton de saisie de fichier

Dans votre fonction `setup()`, après avoir créé le canvas, créez un bouton de saisie de fichier pour les images.

Réfléchissez à :
1. Quelle fonction devrait s'exécuter quand un fichier est sélectionné ? (C'est la fonction de gestion)
2. Où le bouton devrait-il être positionné à l'écran ? (Utilisez vos fonctions `gridX()` et `gridY()` !)
3. Comment pouvez-vous restreindre la sélection de fichiers aux images uniquement ?

Créez le bouton de saisie de fichier en utilisant `createFileInput()` et passez-lui le nom d'une fonction de gestion qui sera appelée quand un fichier est sélectionné. Positionnez-le à l'écran en utilisant la méthode `position()` avec vos fonctions utilitaires de grille. Utilisez la méthode `attribute()` pour restreindre la sélection de fichiers aux images uniquement en définissant `'accept'` à `'image/*'`.

**Documentation** :
- [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) crée un bouton d'upload de fichier
- [`.position()`](https://p5js.org/reference/p5.Element/position) place les éléments à l'écran
- [`.attribute()`](https://p5js.org/reference/p5.Element/attribute) définit les attributs HTML


**Testez !** Vous devriez voir un bouton "Choisir un fichier" en haut à gauche. Essayez de cliquer dessus - un navigateur de fichiers devrait s'ouvrir, mais il ne fera rien encore car nous n'avons pas créé la fonction de gestion.

### Étape 3 (C) : Créer la fonction de gestion

Quand un utilisateur sélectionne un fichier image, vous avez besoin d'une fonction pour le gérer. Créez une fonction qui gère quand un utilisateur sélectionne un fichier image.

Réfléchissez à :
1. Quelles informations cette fonction recevra-t-elle sur le fichier sélectionné ?
2. Comment pouvez-vous vérifier si le fichier est réellement une image (et non un autre type) ?
3. Si c'est une image, comment la chargez-vous et la stockez-vous dans votre variable ?

La fonction sera appelée automatiquement par p5.js quand un fichier est sélectionné. Elle reçoit un objet fichier qui contient des informations sur le fichier sélectionné, y compris les données du fichier que vous pouvez utiliser pour charger l'image. Vérifiez `file.type` pour voir si c'est une image, et si c'est le cas, utilisez `loadImage()` pour charger l'image à partir de `file.data` et stockez-la dans votre variable `bgImage`.

**Documentation** : [`loadImage()`](https://p5js.org/reference/p5/loadImage) charge les fichiers image.

**Pourquoi vérifier le type de fichier ?** Les utilisateurs pourraient accidentellement sélectionner le mauvais type de fichier. Cette vérification empêche les erreurs.


**Testez !** Essayez d'uploader une image - le fichier devrait être sélectionné, mais vous ne le verrez pas encore (nous l'ajouterons ensuite).

### Étape 3 (D) : Afficher l'image de fond

Maintenant, vous devez afficher l'image uploadée comme fond. Dans votre fonction `draw()`, au tout début, vous devez décider quoi dessiner comme fond.

Réfléchissez à :
1. Comment pouvez-vous vérifier si une image a été uploadée ?
2. Si une image existe, comment la dessinez-vous pour remplir tout le canvas ?
3. Si aucune image n'existe encore, quel devrait être le fond ?

C'est une vérification conditionnelle - si nous avons une image, utilisez-la ; sinon, utilisez le fond blanc par défaut. Cela se produit à chaque frame dans `draw()`, donc le fond se mettra à jour immédiatement quand une image est uploadée. Utilisez la fonction `image()` pour dessiner l'image, et positionnez-la à `(0, 0)` avec la taille `width` et `height` pour remplir tout le canvas.

**Documentation** : [`image()`](https://p5js.org/reference/p5/image) dessine des images.


**Testez !** Uploadez une image - elle devrait maintenant apparaître comme fond, remplissant tout le canvas !

---

## Étape 4 : Ajouter l'upload de son pour la piste 1

### Étape 4 (A) : Ajouter la propriété File Input aux objets Track

Chaque piste doit stocker son bouton de saisie de fichier. Dans les objets `track1` et `track2`, ajoutez une propriété pour stocker le bouton de saisie de fichier.

Réfléchissez à la valeur qu'elle devrait avoir au début - nous n'avons pas encore créé le bouton, donc quelle devrait être la valeur initiale ? Utilisez `null` pour représenter que le file input n'existe pas encore.

**Comprendre** :
- Vous ajoutez une propriété pour stocker le bouton de saisie de fichier
- Tout comme `slider: null` et `button: null`, cela stocke un élément UI
- Nous le définirons quand nous créerons le bouton plus tard

### Étape 4 (B) : Créer le bouton de saisie de fichier pour la piste 1

Dans votre fonction `setup()`, après avoir créé le file input de l'image de fond, créez un bouton de saisie de fichier pour la piste 1.

Réfléchissez à :
1. Quelle fonction devrait s'exécuter quand un fichier est sélectionné ? (Vous devrez passer à la fois le fichier et pour quelle piste c'est)
2. Où ce bouton devrait-il être positionné ? (Sous le bouton d'upload de fond, en utilisant vos fonctions utilitaires de grille)
3. Comment pouvez-vous restreindre la sélection de fichiers aux fichiers audio uniquement ?

C'est similaire à l'upload d'image de fond, mais cette fois vous devez dire à la fonction de gestion pour quelle piste est le son. Vous pouvez faire cela en passant l'objet track à la fonction de gestion. Créez le file input en utilisant `createFileInput()` avec une fonction qui appelle votre gestionnaire d'upload de son, en passant à la fois le fichier et l'objet track. Positionnez-le sous le bouton d'upload de fond en utilisant vos fonctions utilitaires de grille, et restreignez la sélection de fichiers aux fichiers audio uniquement.

**Pourquoi passer l'objet track ?** Pour que la fonction de gestion sache quelle piste mettre à jour. Cela nous permet d'utiliser le même gestionnaire pour les deux pistes !


**Testez !** Vous devriez voir un deuxième bouton "Choisir un fichier" sous le premier. Il ne fonctionnera pas encore car nous n'avons pas créé la fonction de gestion.

### Étape 4 (C) : Créer le gestionnaire d'upload de son

Créez une fonction qui gère quand un utilisateur sélectionne un fichier audio. Réfléchissez à :
1. Quelles informations cette fonction a-t-elle besoin ? (Le fichier, et pour quelle piste c'est)
2. Comment pouvez-vous vérifier si le fichier est réellement un fichier audio ?
3. S'il y a déjà un son en cours de lecture, que devrait-il lui arriver ?
4. Comment chargez-vous le nouveau son et le préparez-vous à jouer ?

Cette fonction doit gérer le remplacement d'un son existant. Si un son est actuellement en cours de lecture, vous devriez d'abord l'arrêter. Ensuite, chargez le nouveau son et configurez-le avec le volume correct pour qu'il soit prêt à jouer. Vérifiez `file.type` pour voir si c'est un fichier audio, et si c'est le cas, arrêtez tout son actuellement en cours de lecture sur cette piste, chargez le nouveau son à partir de `file.data` en utilisant `loadSound()`, et définissez son volume en utilisant `setVolume()`.

**Documentation** : [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) charge les fichiers son.

**Pourquoi arrêter le son actuel ?** Si un son est en lecture quand un nouveau est uploadé, nous devrions l'arrêter d'abord. Sinon, les deux sons pourraient jouer en même temps, ou l'ancien son pourrait continuer à jouer.

**Concept visuel** : ![Diagramme montrant le flux d'upload de son - sélection de fichier → arrêter l'ancien son → charger le nouveau son](img/custom_sound_file_upload.svg)

**Testez !** Uploadez un fichier audio pour la piste 1 - il devrait remplacer le son par défaut ! Essayez de le jouer pour vous assurer que cela fonctionne.

---

## Étape 4 : Ajouter l'upload de son pour la piste 2

### Répéter le processus

La piste 2 a besoin de la même fonctionnalité. Dans votre fonction `setup()`, après avoir créé le file input de la piste 1, créez un file input similaire pour la piste 2.

Réfléchissez à :
1. Comment pouvez-vous réutiliser la même fonction de gestion pour la piste 2 ?
2. Où ce bouton devrait-il être positionné ? (Sous le bouton d'upload de la piste 1, en utilisant vos fonctions utilitaires de grille)
3. Qu'est-ce qui est différent de la configuration de la piste 1 ? (Juste l'objet track et la position)

Créez un file input pour la piste 2 en utilisant la même approche que la piste 1. Passez `track2` à la fonction de gestion au lieu de `track1`, et positionnez-le sous le file input de la piste 1 en utilisant vos fonctions utilitaires de grille. Utilisez la même fonction `handleSoundUpload()` - c'est la réutilisation de code !

**Pourquoi le même gestionnaire ?** Parce que nous passons l'objet track comme paramètre, la même fonction fonctionne pour les deux pistes. C'est plus efficace que d'écrire le même code deux fois.


**Testez !** Uploadez des fichiers audio pour les deux pistes - ils devraient tous les deux fonctionner indépendamment !

---

## Étape 5 : Améliorer l'expérience utilisateur

### Ajouter des labels

Les utilisateurs doivent savoir ce que fait chaque bouton de saisie de fichier. Dans votre fonction `draw()`, ajoutez des labels de texte au-dessus de chaque bouton de saisie de fichier.

Réfléchissez à :
1. Quel texte chaque label devrait-il dire ?
2. Où chaque label devrait-il être positionné ? (Juste au-dessus de son bouton correspondant, en utilisant vos fonctions utilitaires de grille)
3. Comment le texte devrait-il être aligné ?

Les labels aident les utilisateurs à comprendre ce que fait chaque bouton. Positionnez-les juste au-dessus de chaque bouton de saisie de fichier pour qu'il soit clair quel label va avec quel bouton. Utilisez `fill()` pour définir la couleur du texte, `textAlign()` pour aligner le texte, et `text()` pour dessiner chaque label à la position appropriée en utilisant vos fonctions utilitaires de grille.


**Testez !** Les labels devraient rendre clair ce que fait chaque bouton !

### Gérer les cas limites

Assurez-vous que votre code gère les situations où les choses pourraient mal tourner. Mettez à jour votre fonction `toggleTrack()` pour vérifier si le son existe avant d'essayer de le jouer.

Réfléchissez à :
1. Que se passe-t-il si un utilisateur clique sur play avant d'uploader un son ?
2. Comment pouvez-vous vérifier si un son existe avant d'essayer de l'utiliser ?

Avant d'utiliser quelque chose (comme un son), vérifiez d'abord s'il existe. Cela empêche les erreurs et rend votre programme plus robuste. C'est ce qu'on appelle la "programmation défensive" - vérifier les problèmes potentiels avant qu'ils ne causent des plantages.

Mettez aussi à jour votre fonction `draw()` pour vérifier si les sons existent avant d'essayer de les utiliser. Quand vous appliquez des changements de volume, vérifiez d'abord si le son existe et s'il est en cours de lecture, puis appliquez le volume. Cela empêche les erreurs si un son n'a pas encore été uploadé.

**Comprendre** :
- Vérifiez si le son existe ET est en cours de lecture avant d'essayer de l'utiliser
- L'opérateur `&&` signifie "les deux conditions doivent être vraies"
- Cela empêche les erreurs si un son n'a pas encore été uploadé

**Pourquoi gérer les cas limites ?** Les utilisateurs pourraient faire des choses inattendues (comme cliquer sur play avant d'uploader un son). Votre programme devrait gérer cela gracieusement au lieu de planter.

**Testez !** Essayez de cliquer sur les boutons play avant d'uploader des sons - le programme devrait le gérer gracieusement sans erreurs !

---

## Étape 6 : Tout mettre ensemble

### Liste de contrôle des tests finaux

Testez toutes les fonctionnalités :

1. ✅ **Upload d'image de fond**
   - Cliquez sur "Choisir un fichier" pour le fond
   - Sélectionnez une image
   - Apparaît-elle comme fond ?

2. ✅ **Upload de son pour la piste 1**
   - Cliquez sur "Choisir un fichier" pour la piste 1
   - Sélectionnez un fichier audio
   - Remplace-t-il le son par défaut ?
   - Pouvez-vous le jouer ?

3. ✅ **Upload de son pour la piste 2**
   - Cliquez sur "Choisir un fichier" pour la piste 2
   - Sélectionnez un fichier audio
   - Remplace-t-il le son par défaut ?
   - Pouvez-vous le jouer ?

4. ✅ **Mixage**
   - Uploadez des sons pour les deux pistes
   - Jouez les deux pistes en même temps
   - Ajustez les volumes indépendamment
   - Tout fonctionne-t-il ensemble ?

5. ✅ **Cas limites**
   - Essayez de cliquer sur play avant d'uploader des sons
   - Essayez d'uploader de mauvais types de fichiers
   - Le programme gère-t-il cela gracieusement ?

### Idées de personnalisation

Maintenant que les uploads de fichiers fonctionnent, essayez :
- Uploadez différentes images de fond (photos, motifs, couleurs)
- Uploadez vos chansons préférées
- Mélangez différents genres de musique
- Créez des tables de mixage DJ thématiques :
  - Musique électronique avec des fonds néon
  - Jazz avec des fonds photo vintage
  - Rock avec des fonds photo de concert

---

## Dépannage

### Problème : L'image ne s'affiche pas après l'upload

**Causes possibles** :
- L'image n'est pas chargée correctement
- L'image n'est pas dessinée dans `draw()`

**Solutions** :
- Vérifiez que `handleBackgroundImage()` appelle `loadImage(file.data)`
- Vérifiez que `draw()` vérifie `if (bgImage)` et appelle `image()`
- Vérifiez la console du navigateur pour les messages d'erreur

### Problème : Le son ne joue pas après l'upload

**Causes possibles** :
- Le son n'est pas chargé correctement
- Le son n'est pas configuré correctement

**Solutions** :
- Vérifiez que `handleSoundUpload()` appelle `loadSound(file.data)`
- Vérifiez que le volume est défini : `track.sound.setVolume(track.volume)`
- Vérifiez la console du navigateur pour les messages d'erreur
- Assurez-vous que vous utilisez des fichiers audio (MP3, WAV, OGG)

### Problème : Les boutons de saisie de fichier sont au mauvais endroit

**Solution** : Ajustez les valeurs `position()` :
- `position(10, 10)` - upload d'image de fond
- `position(10, 50)` - upload de la piste 1
- `position(10, 90)` - upload de la piste 2
- Augmentez les valeurs y pour les déplacer vers le bas

### Problème : De mauvais types de fichiers peuvent être sélectionnés

**Solution** : Vérifiez que vous utilisez `.attribute('accept', 'image/*')` pour les images et `'audio/*'` pour les fichiers audio.

### Problème : Le programme plante quand on clique sur play avant d'uploader

**Solution** : Assurez-vous que vous vérifiez si les sons existent :
- Dans `toggleTrack()` : `if (!track.sound) { return; }`
- Dans `draw()` : `if (track1.sound && track1.sound.isPlaying())`

**Rappelez-vous** : Vérifiez toujours la console du navigateur (F12) pour les messages d'erreur. Ils vous diront exactement ce qui ne va pas !

---

## Étape 7 : Partager votre table de mixage DJ

### Partager sur l'éditeur web p5.js

Une fois que votre table de mixage DJ fonctionne, vous pouvez la partager avec d'autres :

1. Dans l'éditeur web p5.js, cliquez sur le bouton "Share" (généralement en haut à droite)
2. Copiez le lien de partage qui apparaît
3. Envoyez-le à des amis ou publiez-le en ligne

**Pourquoi partager ?**
- Les amis peuvent utiliser votre table de mixage DJ
- Ils peuvent uploader leurs propres sons et images
- Vous pouvez obtenir des commentaires et voir comment d'autres l'utilisent
- Construisez une communauté autour de votre projet

### Partager avec des amis

**Votre tâche** :
1. Partagez votre lien de sketch p5.js avec un ami
2. Demandez-leur de :
   - Uploader leurs propres sons et images
   - Créer leur propre table de mixage DJ personnalisée
   - Le partager avec vous !

**Pourquoi partager ?**
- Voyez comment d'autres personnalisent votre création
- Obtenez des idées d'améliorations
- Construisez une communauté autour de votre projet
- Amusez-vous à mélanger de la musique ensemble !
- Apprenez de la façon dont d'autres utilisent votre code

---

## Félicitations ! 🎉

Vous avez ajouté avec succès des fonctionnalités de personnalisation à votre table de mixage DJ ! Les utilisateurs peuvent maintenant uploader leurs propres images de fond et sons, rendant chaque table de mixage DJ unique et personnelle.

**Ce que vous avez appris** :
- Comment fonctionnent les uploads de fichiers dans les applications web
- Comment créer des boutons de saisie de fichier dans p5.js
- Comment gérer les uploads de fichiers image
- Comment gérer les uploads de fichiers audio
- Comment remplacer les assets existants par des fichiers uploadés par l'utilisateur
- Comment améliorer l'expérience utilisateur avec des labels et la gestion des erreurs
- Comment gérer les cas limites gracieusement
- Comment utiliser un système de positionnement basé sur la grille pour la mise en page de l'interface
- Comment créer des fonctions helper pour un code plus propre
- Comment partager votre création avec d'autres

**Prochaines étapes** :
- Expérimentez avec différents types de fichiers
- Ajoutez plus d'options de personnalisation (couleurs, polices, etc.)
- **Partagez votre lien de sketch p5.js avec des amis !**
- **Encouragez les amis à créer leurs propres tables de mixage DJ personnalisées !**
- Essayez de créer des tables de mixage DJ thématiques avec des images et sons assortis

