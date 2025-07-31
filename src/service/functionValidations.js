export function validerText(occ) {
  return occ && occ.trim().length >= 3;
}
export function validerEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function validerTelephone(tel) {
  // Supprime les espaces, tirets et parenthèses
  const nettoye = tel.replace(/[\s\-().]/g, '');

  // Expression régulière pour valider les formats courants :
  // Commence par + ou 0, puis 9 à 14 chiffres
  return /^(\+?\d{1,3})?\d{9,14}$/.test(nettoye);
}
export function validerForm(champs){
 const  erreurs = {}
 if (!champs.nomEpic || champs.nomEpic.trim().length < 2) {
    erreurs.nomEpic = "champ obligatoire";
  }
   if (!champs.nomRes || champs.nomRes.trim().length < 2) {
    erreurs.nomRes = "champ obligatoire";
  }
   if (!champs.tel) {
    erreurs.tel = "champ obligatoire";
  } else if (!validerTelephone(champs.tel)) {
    erreurs.tel = "Numéro de téléphone invalide";
  }
    if (!champs.email) {
    erreurs.email = "L'email est obligatoire";
  } else if (!validerEmail(champs.email)) {
    erreurs.email = "Format d'email invalide";
  }
    if(!champs.addresse){
    erreurs.addresse = "Champ obligatoire"
  } else if(!validerText(champs.addresse)){
    erreurs.addresse = "Addresse invalide"
  }
  return erreurs;
}