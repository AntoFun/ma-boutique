// ==================================================================
// CONFIGURATION TELEGRAM — pour recevoir les commandes directement
// dans ton Telegram. À faire une seule fois.
// ==================================================================
//
// ⚠️ POINT IMPORTANT DE SÉCURITÉ
// Ce site n'a pas de serveur : tout le code, y compris ce fichier,
// est visible par n'importe qui qui ouvre l'outil "Inspecter" de son
// navigateur sur ton site. Si tu mets ton TOKEN ci-dessous et que le
// site est en ligne publiquement, quelqu'un pourrait le récupérer et
// l'utiliser pour envoyer des messages avec TON bot (spam, etc.).
// Ça ne donne PAS accès à ton compte Telegram perso, juste au bot.
//
// -> Si le site reste privé / partagé qu'à des gens de confiance :
//    tu peux utiliser directement TELEGRAM_BOT_TOKEN ci-dessous, c'est
//    la solution simple (étapes 1-3).
// -> Si le site est/sera public : utilise plutôt PROXY_URL (étape 4),
//    qui cache le token derrière un petit relais gratuit (Cloudflare
//    Worker). Regarde le fichier "cloudflare-worker-proxy.js" fourni
//    et son README pour le mettre en place en 5 minutes.
//
// ÉTAPE 1 — Crée ton bot
//   Sur Telegram, cherche "BotFather", envoie-lui /newbot et suis
//   les instructions (nom du bot, puis nom d'utilisateur du bot).
//   Il te donne un TOKEN qui ressemble à : 123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// ÉTAPE 2 — Récupère ton CHAT_ID
//   Envoie n'importe quel message à TON bot (celui que tu viens de créer),
//   puis ouvre cette adresse dans ton navigateur (remplace TON_TOKEN) :
//   https://api.telegram.org/botTON_TOKEN/getUpdates
//   Tu verras un bloc "chat":{"id": 123456789, ...} -> ce nombre est ton CHAT_ID.
//
// ÉTAPE 3 — Colle les deux valeurs ci-dessous (solution simple).
//
// ÉTAPE 4 (optionnelle, recommandée si site public) — Après avoir
//   déployé le relais Cloudflare Worker, colle son URL dans PROXY_URL.
//   Si PROXY_URL est rempli, il est utilisé à la place du token direct
//   et TELEGRAM_BOT_TOKEN peut rester vide.
// ==================================================================

const TELEGRAM_BOT_TOKEN = "COLLE_TON_TOKEN_ICI";
const TELEGRAM_CHAT_ID = "COLLE_TON_CHAT_ID_ICI";
const PROXY_URL = "https://boutique-telegram.antoinegelly.workers.dev";

// Envoie un message texte à ton Telegram. Renvoie true si ça a marché.
async function envoyerSurTelegram(texte){
  // --- Cas 1 : un relais (proxy) est configuré -> on l'utilise, le token
  //     n'est alors jamais présent dans le code du site. ---
  if(PROXY_URL){
    try{
      const reponse = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texte: texte })
      });
      const data = await reponse.json();
      return data.ok === true;
    }catch(e){
      console.error("Erreur envoi via le relais :", e);
      return false;
    }
  }

  // --- Cas 2 : pas de relais -> appel direct à l'API Telegram
  //     (token visible dans le code, voir la note en haut du fichier). ---
  if(TELEGRAM_BOT_TOKEN === "COLLE_TON_TOKEN_ICI" || TELEGRAM_CHAT_ID === "COLLE_TON_CHAT_ID_ICI"){
    console.warn("Telegram non configuré : remplis telegram-config.js");
    return false;
  }
  try{
    const reponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: texte
      })
    });
    const data = await reponse.json();
    return data.ok === true;
  }catch(e){
    console.error("Erreur envoi Telegram :", e);
    return false;
  }
}
