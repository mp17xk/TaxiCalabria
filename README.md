# Taxi Calabria – Michele Galati

Sito one-page statico (HTML/CSS/JS, nessuna build). Apri `index.html` o pubblica la cartella su qualsiasi hosting statico (Netlify, GitHub Pages, hosting del dominio).

## Dove modificare
| Cosa | File |
|---|---|
| Numeri, WhatsApp, zona, social, servizi, orari, vettura, foto, P. IVA | `js/config.js` |
| Testi IT/EN e messaggio WhatsApp precompilato | `js/i18n.js` |
| Colori, font, spaziature | `css/style.css` (variabili in `:root`) |

## Dati ancora da confermare
Nel sito compaiono come "in aggiornamento / da confermare" finché non vengono inseriti in `js/config.js`:
- Foto di Michele (`driverPhoto`) e della vettura (`vehicle.photo`) – consigliato WebP, lato lungo ~1200 px, in `img/`
- Modello e posti della vettura (`vehicle.model`, `vehicle.seats`)
- Orari / disponibilità (`hours`)
- Partita IVA (`vatNumber`)
- Aeroporti, stazioni e porti serviti nello specifico (testi in `js/i18n.js`)

Volutamente assenti: tariffe, recensioni, disponibilità h24.

## Immagini
`img/logo.png` è l'originale; `logo-web.webp/png`, `mark.png` e `favicon-32.png` sono versioni ottimizzate derivate.
