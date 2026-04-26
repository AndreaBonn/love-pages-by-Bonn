[English](SECURITY.md) | **Italiano**

# Policy di sicurezza

## Versioni supportate

| Versione | Supportata |
|---|---|
| 1.x (corrente, branch `main`) | Sì |

## Segnalare una vulnerabilità

Se trovi una vulnerabilità di sicurezza in questo progetto, segnalala tramite [GitHub Security Advisories](https://github.com/AndreaBonn/love-pages-by-Bonn/security/advisories/new).

Non aprire una issue pubblica per vulnerabilità di sicurezza.

La segnalazione dovrebbe includere:

- Una descrizione della vulnerabilità
- I passaggi per riprodurla
- L'impatto potenziale (cosa potrebbe ottenere un attaccante)
- Una possibile soluzione, se ne hai una

**Tempi di risposta:**

- Conferma di ricezione entro 72 ore
- Fix per vulnerabilità critiche entro 30 giorni
- Disclosure pubblica coordinata dopo il rilascio del fix

## Misure di sicurezza implementate

LovePage è un sito statico senza codice server-side, senza database, senza autenticazione e senza richieste di rete esterne. La superficie di attacco è limitata al codice client-side che gira nel browser.

Le seguenti misure sono implementate:

- **Prevenzione XSS**: i nomi forniti dall'utente (`yourName`, `partnerName`) vengono sanitizzati tramite la funzione `escapeHTML()` in `engine.js` prima dell'inserimento nel DOM. Tutti gli altri testi configurabili dall'utente sono inseriti tramite `textContent`, non `innerHTML`.
- **Validazione input**: valori `language` non supportati ricadono su `"en"` (vedi `getConfig()` in `engine.js`). Valori `forceEvent` non validi vengono ignorati e si usa il rilevamento automatico (vedi `detectEvent()` in `engine.js`).
- **Nessuna richiesta esterna**: la pagina non carica risorse esterne. Nessun CDN, nessun analytics, nessun font di terze parti, nessun tracciamento. Tutto funziona dai file locali serviti da GitHub Pages.
- **Sicurezza link**: i link esterni usano `rel="noopener"` per prevenire il reverse tabnapping (vedi `populateDOM()` in `engine.js`).
- **Fallback controllato**: se la foto configurata non viene caricata, la pagina mostra un'emoji al posto di un'immagine rotta (vedi gestore errore foto in `populateDOM()` in `engine.js`).

## Best practice di sicurezza per gli utenti

- Non inserire informazioni sensibili (password, chiavi API, indirizzi personali) in `config.js`. Questo file è pubblicamente visibile nel tuo repository GitHub.
- Se carichi foto in `assets/photos/`, tieni presente che sono accessibili pubblicamente a chiunque abbia l'URL.

## Fuori ambito

I seguenti casi non sono considerati vulnerabilità per questo progetto:

- Self-XSS (un attaccante che può modificare `config.js` ha già accesso in scrittura al repository)
- Attacchi di ingegneria sociale
- Vulnerabilità nell'infrastruttura di GitHub Pages
- Vulnerabilità nel browser dell'utente
- Iniezione di contenuti da parte dei proprietari del repository nei propri fork (questo è il comportamento previsto)

## Ringraziamenti

Nessuna vulnerabilità è stata segnalata finora.

---

[Torna al README](README.it.md)
