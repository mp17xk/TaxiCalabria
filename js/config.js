/*
 * CONFIGURAZIONE DEL SITO – Taxi Calabria · Michele Galati
 * Modifica solo questo file per aggiornare recapiti, zona e servizi.
 * Un valore `null` indica un dato NON ancora confermato: il sito mostra
 * un avviso "da confermare" invece di inventarlo.
 */
window.SITE_CONFIG = {
  // Numeri in formato internazionale senza spazi né "+" (usati per tel: e wa.me)
  phones: [
    { number: "39368650144", display: "+39 368 650 144", whatsapp: true, primary: true },
    { number: "393382045622", display: "+39 338 204 5622", whatsapp: true, primary: false }
  ],

  // Zona operativa (testo per lingua)
  area: {
    it: "Vibo Valentia e Calabria",
    en: "Vibo Valentia and Calabria"
  },

  social: {
    instagram: "https://www.instagram.com/taxicalabria/",
    facebook: "https://www.facebook.com/people/Taxi-Galati/100050953557106/"
  },

  // Servizi confermati: imposta active:false per nasconderne uno.
  // I testi sono in js/i18n.js alle chiavi service.<id>.title / .text
  services: [
    { id: "airport", icon: "plane", active: true },
    { id: "station", icon: "train", active: true },
    { id: "rides", icon: "route", active: true },
    { id: "roadside", icon: "tow", active: true }
  ],

  // Dati da confermare: sostituisci null con il valore reale.
  vehicle: {
    model: null,      // es. "Mercedes Classe E"
    seats: null,      // es. 4
    photo: null       // es. "img/auto.webp"
  },
  driverPhoto: "img/FotoMichele.jpeg",
  hours: null,        // es. { it: "Lun–Sab 6:00–22:00", en: "Mon–Sat 6am–10pm" }
  vatNumber: null     // es. "01234567890"
};
