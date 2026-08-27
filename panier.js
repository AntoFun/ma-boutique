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
  // ne casse la page ou ne fausse le panier.
  return donnees
    .filter(p => p && typeof p === "object")
    .map(p => ({
      id: Number(p.id),
      quantite: Math.min(99, Math.max(1, Math.floor(Number(p.quantite)) || 1))
    }))
    .filter(p => Number.isFinite(p.id) && PRODUITS.some(prod => prod.id === p.id));
}

function sauverPanier(panier){
  localStorage.setItem(PANIER_CLE, JSON.stringify(panier));
  majBadgePanier();
}

function ajouterAuPanier(id, quantite){
  quantite = quantite || 1;
  const panier = lirePanier();
  const item = panier.find(p => p.id === id);
  if(item){
    item.quantite += quantite;
  }else{
    panier.push({ id: id, quantite: quantite });
  }
  sauverPanier(panier);
}

function retirerDuPanier(id){
  sauverPanier(lirePanier().filter(p => p.id !== id));
}

function modifierQuantite(id, quantite){
  const panier = lirePanier();
  const item = panier.find(p => p.id === id);
  if(item){
    item.quantite = Math.max(1, quantite);
    sauverPanier(panier);
  }
}

function nombreArticlesPanier(){
  return lirePanier().reduce((total, p) => total + p.quantite, 0);
}

// Empêche toute injection de code HTML/JS : transforme le texte en
// équivalent sûr à afficher (ex: "<script>" devient inoffensif).
// À utiliser à chaque fois qu'on affiche un texte saisi par quelqu'un.
function echapperHTML(texte){
  const div = document.createElement("div");
  div.textContent = String(texte);
  return div.innerHTML;
}

// Nettoie un champ "une ligne" (prénom, nom, pseudo...) : retire les
// retours à la ligne et limite la longueur, pour éviter qu'un texte
// saisi ne casse la mise en forme du message envoyé sur Telegram.
function nettoyerTexteLigne(texte, longueurMax){
  return String(texte).replace(/[\r\n]+/g, " ").trim().slice(0, longueurMax || 60);
}

function formaterPrix(nombre){
  return nombre.toFixed(2).replace(".", ",") + " €";
}

function majBadgePanier(){
  document.querySelectorAll(".badge-panier").forEach(badge => {
    const n = nombreArticlesPanier();
    badge.textContent = n;
    badge.style.display = n > 0 ? "flex" : "none";
  });
}

// Crée une image avec un texte de secours si le fichier est manquant/introuvable
function creerImageAvecSecours(src, alt, classeParent){
  const wrapper = document.createElement("div");
  wrapper.className = classeParent + "-image";
  if(src){
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.onerror = function(){
      wrapper.textContent = "";
      const secours = document.createElement("div");
      secours.className = "image-vide";
      secours.textContent = "Image introuvable : " + src;
      wrapper.appendChild(secours);
    };
    wrapper.appendChild(img);
  }else{
    const secours = document.createElement("div");
    secours.className = "image-vide";
    secours.textContent = "Ajoute ton image ici";
    wrapper.appendChild(secours);
  }
  return wrapper;
}

document.addEventListener("DOMContentLoaded", majBadgePanier);
