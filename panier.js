// ==================================================================
// GESTION DU PANIER — pas besoin d'y toucher normalement
// ==================================================================
const PANIER_CLE = "mb_panier";

function lirePanier(){
  let donnees;
  try{
    donnees = JSON.parse(localStorage.getItem(PANIER_CLE)) || [];
  }catch(e){
    return [];
  }
  if(!Array.isArray(donnees)) return [];

  // On valide chaque entrée : id doit être un nombre qui correspond à un
  // vrai produit, quantité doit être un entier raisonnable (1 à 99).
  // Ça évite qu'une donnée corrompue ou trafiquée dans le localStorage
  // ne casse la page ou ne
