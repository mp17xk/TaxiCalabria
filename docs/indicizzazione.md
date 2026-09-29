# Guida rapida: indicizzare il sito su Google

Sostituisci `https://TUO-DOMINIO.it/` con l'indirizzo pubblico reale del sito.

## 1. Pubblica il sito
Il sito deve essere online su un indirizzo pubblico (dominio proprio, GitHub Pages o Netlify). Verifica che si apra da telefono, in HTTPS.

## 2. Aggiungi `robots.txt` e `sitemap.xml` (nella radice, accanto a `index.html`)

`robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://TUO-DOMINIO.it/sitemap.xml
```

`sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://TUO-DOMINIO.it/</loc></url>
</urlset>
```

## 3. Migliora `index.html` (dentro `<head>`)
- Canonical: `<link rel="canonical" href="https://TUO-DOMINIO.it/">`
- `og:url` e `og:image` con URL assoluti (ora `og:image` è relativo e non funziona nelle anteprime social).
- Dati strutturati `TaxiService` / `LocalBusiness` (JSON-LD) con nome, telefono, zona (Vibo Valentia), link alla scheda Google.

## 4. Google Search Console
1. Vai su https://search.google.com/search-console e accedi con l'account Google.
2. **Aggiungi proprietà** → "Prefisso URL" → inserisci l'indirizzo del sito.
3. Verifica la proprietà (file HTML da caricare, tag `<meta>` o record DNS).
4. **Sitemap** → inserisci `sitemap.xml` → Invia.
5. **Controllo URL** → incolla l'indirizzo della home → **Richiedi indicizzazione**.

L'indicizzazione richiede da qualche giorno a un paio di settimane.

## 5. Google Business Profile (il più importante per un taxi locale)
La scheda "Taxi Vibo Valentia Galati Michele" esiste già su Google Maps. Rivendicala (o accedi se è già tua) da https://business.google.com e:
- inserisci l'indirizzo del sito nel campo **Sito web**;
- controlla che telefono, orari e zona di servizio siano corretti;
- aggiungi foto (tassista e vettura) e rispondi alle recensioni.

## 6. Segnali extra
- Metti il link del sito in profili social, WhatsApp Business e directory locali (PagineGialle, ecc.).
- Chiedi ai clienti soddisfatti di lasciare recensioni Google.
- Controlla dopo 1–2 settimane cercando `site:TUO-DOMINIO.it` su Google.
