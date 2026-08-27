// ==================================================================
// DONNÉES DES PRODUITS — C'EST LE SEUL FICHIER À MODIFIER AU QUOTIDIEN
// ==================================================================
// Pour chaque produit :
//  - id           : un numéro unique (ne pas dupliquer)
//  - ref          : la référence affichée (juste esthétique)
//  - nom          : le nom du produit
//  - prix         : un nombre, ex: 29.90 (utilise un point, pas une virgule)
//  - images       : liste des noms de fichiers images, ex: ["produit1.jpg", "produit1-dos.jpg"]
//                   -> laisse [] si tu n'as pas encore d'image
//  - description  : liste de points (autant que tu veux)
//
// Pour AJOUTER un produit : copie un bloc { ... } entier et change l'id.
// Pour RETIRER un produit : supprime son bloc.
// ==================================================================

const PRODUITS = [
  {
    id: 1,
    ref: "001",
    nom: "Nom du produit",
    prix: 0,
    images: [], // ex: ["produit1.jpg"]
    description: [
      "Ajoute ici une première caractéristique",
      "Ajoute ici une deuxième caractéristique",
      "Ajoute ici une troisième caractéristique"
    ]
  },
  {
    id: 2,
    ref: "002",
    nom: "Nom du produit",
    prix: 0,
    images: [],
    description: [
      "Ajoute ici une première caractéristique",
      "Ajoute ici une deuxième caractéristique",
      "Ajoute ici une troisième caractéristique"
    ]
  },
  {
    id: 3,
    ref: "003",
    nom: "Nom du produit",
    prix: 0,
    images: [],
    description: [
      "Ajoute ici une première caractéristique",
      "Ajoute ici une deuxième caractéristique",
      "Ajoute ici une troisième caractéristique"
    ]
  },
  {
    id: 4,
    ref: "004",
    nom: "Nom du produit",
    prix: 0,
    images: [],
    description: [
      "Ajoute ici une première caractéristique",
      "Ajoute ici une deuxième caractéristique",
      "Ajoute ici une troisième caractéristique"
    ]
  }
];
