# Apprendre JavaScript en 5 Minutes (ou plus)

Ceci est une introduction concise aux concepts JavaScript utilisés dans cet atelier. Apprenez les bases rapidement !

**Important** : Lire ce guide sans essayer le code vous-même est inutile ! Ouvrez un éditeur de code ou la console du navigateur et tapez les exemples pendant que vous lisez. Apprendre à coder nécessite de la pratique, pas seulement de la lecture.

```javascript
///////////////////////////////////
// 1. Instructions et Commentaires

// Les instructions sont des commandes qui disent à l'ordinateur quoi faire.
// Chaque instruction se termine généralement par un point-virgule (;)

faireQuelqueChose(); // Ceci est une instruction

// Les commentaires expliquent votre code et sont ignorés par l'ordinateur.
// Les commentaires sur une seule ligne commencent par deux slashes

/* Les commentaires multi-lignes commencent par slash-étoile
   et se terminent par étoile-slash */

///////////////////////////////////
// 2. Nombres et Opérations de Base

// Les nombres peuvent être des nombres entiers ou des décimales.
// Les deux sont juste des nombres en JavaScript.

3;        // = 3 (nombre entier)
1.5;      // = 1.5 (décimal)
42;       // = 42 (nombre entier)
0.5;      // = 0.5 (décimal)

// L'arithmétique de base fonctionne comme prévu :
1 + 1;    // = 2 (addition)
10 - 3;   // = 7 (soustraction)
4 * 2;    // = 8 (multiplication)
8 / 2;    // = 4 (division)

// La division peut donner des décimales :
5 / 2;    // = 2.5

// Valeurs numériques spéciales :
0;        // zéro est un nombre valide
null;     // null signifie "pas de valeur" ou "vide"
undefined; // undefined signifie "pas encore assigné"

///////////////////////////////////
// 3. Chaînes de Caractères (Texte)

// Les chaînes de caractères représentent du texte et sont créées avec des guillemets.
'Bonjour';        // Guillemets simples
"Monde";          // Guillemets doubles - les deux fonctionnent de la même façon
'123';            // Ceci est une chaîne, pas un nombre !

// Les chaînes peuvent être combinées avec +
"Bonjour " + "monde"; // = "Bonjour monde"
"Score : " + 100;     // = "Score : 100"

///////////////////////////////////
// 4. Booléens (Vrai/Faux)

// Les booléens sont des valeurs vrai ou faux.
true;   // = vrai
false;  // = faux

// Ces valeurs sont utilisées dans les conditions.

///////////////////////////////////
// 5. Variables et Affectation

// Les variables stockent des valeurs pour pouvoir les réutiliser.
// Utilisez `let` pour déclarer une variable :

let monNombre = 5;     // Créer la variable "monNombre" avec la valeur 5
let monTexte = "Salut"; // Créer la variable "monTexte" avec la valeur "Salut"

// Les variables peuvent être réassignées (modifiées) :
monNombre = 10;        // Maintenant monNombre est 10
monTexte = "Bonjour";  // Maintenant monTexte est "Bonjour"

// Les variables peuvent être déclarées sans valeur initiale :
let x;                 // x est undefined (pas encore défini)
x = 42;                // Maintenant x est 42

// Vous pouvez déclarer plusieurs variables à la fois :
let a = 1, b = 2, c = 3;

// Les variables doivent être déclarées avant utilisation :
let resultat;
resultat = 10 + 5;     // resultat est maintenant 15

///////////////////////////////////
// 6. Opérations d'Affectation

// Le signe égal (=) assigne une valeur à une variable.
let valeur = 10;       // Assigner 10 à la variable "valeur"

// Raccourcis pour les opérations mathématiques :
valeur += 5;           // Équivalent à : valeur = valeur + 5; (valeur est maintenant 15)
valeur -= 3;           // Équivalent à : valeur = valeur - 3; (valeur est maintenant 12)
valeur *= 2;           // Équivalent à : valeur = valeur * 2; (valeur est maintenant 24)
valeur /= 4;           // Équivalent à : valeur = valeur / 4; (valeur est maintenant 6)

///////////////////////////////////
// 7. Objets

// Les objets stockent plusieurs valeurs ensemble.
// Chaque valeur a une étiquette (appelée propriété).

let personne = {
    nom: "Alice",         // propriété "nom" avec la valeur "Alice"
    age: 30,              // propriété "age" avec la valeur 30
    estActive: true       // propriété "estActive" avec la valeur true
};

// Accéder aux propriétés d'objet avec un point :
personne.nom;             // = "Alice"
personne.age;             // = 30

// Vous pouvez aussi utiliser des crochets :
personne["nom"];          // = "Alice" (même chose que personne.nom)
personne["age"];          // = 30 (même chose que personne.age)

// Modifier les valeurs des propriétés :
personne.age = 31;        // Maintenant personne.age est 31

// Ajouter de nouvelles propriétés :
personne.ville = "Paris"; // Ajouter la propriété "ville" avec la valeur "Paris"

// Les propriétés peuvent être de n'importe quel type :
let donnees = {
    nombre: 42,
    texte: "bonjour",
    drapeau: true,
    valeur: null
};

// Les objets peuvent contenir d'autres objets :
let imbrique = {
    position: {
        x: 10,
        y: 20
    }
};
imbrique.position.x;      // = 10
imbrique.position.y;      // = 20

///////////////////////////////////
// 8. Fonctions

// Les fonctions sont des blocs de code réutilisables.
// Elles s'exécutent quand vous les appelez.

// Définir une fonction :
function saluer() {
    console.log("Bonjour !");
}

// Appeler la fonction :
saluer();                 // Exécute la fonction, affiche "Bonjour !"

// Les fonctions peuvent prendre des valeurs (appelées paramètres) :
function additionner(a, b) {
    return a + b;         // return renvoie une valeur
}

// Appeler la fonction avec des valeurs :
additionner(2, 3);        // = 5
let somme = additionner(10, 5); // somme est maintenant 15

// Les fonctions peuvent renvoyer des valeurs :
function multiplier(x, y) {
    return x * y;         // Renvoyer le résultat
}

let produit = multiplier(4, 7);  // produit est maintenant 28

// Les fonctions sans return renvoient undefined (mais peuvent quand même affecter l'état global de votre programme) :
function faireQuelqueChose() {
    // Pas d'instruction return
}
let resultat = faireQuelqueChose();    // resultat est undefined

// Fonctions sans nom (fonctions anonymes) :
let maFonction = function(x, y) {
    return x + y;
};
maFonction(3, 4);         // = 7

// Vous pouvez passer des fonctions comme valeurs :
function traiterNombre(valeur, operation) {
    return operation(valeur);
}

traiterNombre(5, function(n) {
    return n * 2;
});                        // = 10

///////////////////////////////////
// 9. Conditions (if/else)

// Les conditions permettent de prendre des décisions dans le code.
// Le code ne s'exécute que si une condition est vraie.

let age = 20;

if (age >= 18) {
    console.log("Adulte");
}

// if/else fournit deux chemins :
if (age >= 18) {
    console.log("Adulte");
} else {
    console.log("Mineur");
}

// Plusieurs conditions avec else if :
if (age < 13) {
    console.log("Enfant");
} else if (age < 18) {
    console.log("Adolescent");
} else {
    console.log("Adulte");
}

// Les conditions utilisent des comparaisons :
// === signifie "exactement égal à"
// !== signifie "pas égal à"
// < signifie "inférieur à"
// > signifie "supérieur à"
// <= signifie "inférieur ou égal à"
// >= signifie "supérieur ou égal à"

let x = 5;
let y = 10;

x === 5;        // = true (x est exactement égal à 5)
x !== 5;        // = false (x n'est pas égal à 5)
x < y;          // = true (5 est inférieur à 10)
x > y;          // = false (5 n'est pas supérieur à 10)
x <= 5;         // = true (5 est inférieur ou égal à 5)

// Comparaisons avec les chaînes :
"a" < "b";      // = true (ordre alphabétique)

// Vérifier null ou undefined :
let valeur = null;
if (valeur === null) {
    console.log("Pas de valeur");
}

let nom;
if (nom === undefined) {
    console.log("Pas encore défini");
}

// Certaines valeurs comptent comme faux, d'autres comme vrai :
// Valeurs fausses : false, 0, "", null, undefined, NaN
// Tout le reste compte comme vrai

if (0) {
    // Ceci ne s'exécutera pas (0 compte comme faux)
}

if (1) {
    // Ceci s'exécutera (1 compte comme vrai)
}

///////////////////////////////////
// 10. Combiner les Concepts

// Voici comment tout fonctionne ensemble :

let joueur = {
    nom: "Bob",
    score: 0,
    estActive: true
};

function mettreAJourScore(joueur, points) {
    if (joueur.estActive) {
        joueur.score += points;
        return joueur.score;
    } else {
        return null;
    }
}

let nouveauScore = mettreAJourScore(joueur, 10);
// nouveauScore est maintenant 10, joueur.score est aussi 10

// Vérifier le résultat :
if (nouveauScore !== null) {
    console.log("Score mis à jour à " + nouveauScore);
} else {
    console.log("Joueur non actif");
}

///////////////////////////////////
// Résumé

// Vous savez maintenant :
// - Instructions et commentaires
// - Nombres et math de base (+, -, *, /)
// - Chaînes de caractères (texte avec guillemets)
// - Booléens (true/false)
// - Variables (let, affectation avec =)
// - Objets (propriétés, notation point et crochets)
// - Fonctions (définir, appeler, paramètres, return, anonymes)
// - Conditions (if/else, comparaisons, ===, !==, <, >, <=, >=)
// - null et undefined
// - Comment tout combiner !

///////////////////////////////////
```

## Pour Aller Plus Loin

Ce tutoriel couvre uniquement les bases utilisées dans cet atelier. Pour en apprendre plus sur JavaScript :

- [Guide JavaScript MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide) - Documentation JavaScript complète
- [JavaScript.info](https://javascript.info/) - Tutoriel JavaScript moderne
- [Learn X in Y Minutes : JavaScript](https://learnxinyminutes.com/javascript/) - Inspiration pour ce document

---

Créé à l'origine pour l'Atelier p5.js DJ.

