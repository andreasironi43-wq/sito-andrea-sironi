/**
 * Modalità pre-lancio: attiva finché il primo drop non apre.
 * Nasconde carrello, Archivio e Journal, blocca l'acquisto e porta l'iscrizione al drop in primo piano.
 * Per aprire il negozio: PRELAUNCH=0 nelle variabili d'ambiente, poi nuovo deploy.
 */
export const prelaunch = process.env.PRELAUNCH !== "0";
