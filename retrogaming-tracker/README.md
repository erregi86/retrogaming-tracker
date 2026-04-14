# 🎮 Retrogaming Vinted Tracker

Dashboard per tracciare i prezzi più bassi di retrogaming su Vinted.it

## Funzionalità

- **Console**: PS1, PS2, PS3, PS4, Wii, GameCube, N64, Atari, Dreamcast — link diretti Vinted filtrati per prezzo più basso e condizioni buone/ottime
- **Giochi per console**: tutti i giochi per ogni console ordinati dal prezzo più basso
- **N64 Titoli**: titoli specifici con slider del prezzo massimo personalizzabile (default €7)
- **Collezionismo**: lotti, controller, memory card, box originali, merchandise

## Deploy su Vercel (5 minuti)

### Metodo 1: Drag & Drop (il più semplice)
1. Vai su [vercel.com](https://vercel.com) e crea un account gratuito
2. Dal dashboard, clicca **"Add New → Project"**
3. Clicca **"Import from GitHub"** oppure usa il drag & drop della cartella
4. Lascia tutto di default e clicca **"Deploy"**
5. In 2 minuti hai l'URL pubblico!

### Metodo 2: Via GitHub
1. Crea un repo GitHub e carica tutti i file di questa cartella
2. Vai su [vercel.com](https://vercel.com), connetti GitHub
3. Seleziona il repo → Deploy automatico

### Metodo 3: Vercel CLI
```bash
npm install -g vercel
vercel
```

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

## Come funzionano i link

I link aprono Vinted con:
- `order=price_low_to_high` — dal prezzo più basso
- `status_ids[]=3` — condizioni "ottime"  
- `status_ids[]=6` — condizioni "buone"
- `catalog[]=3025` — categoria Console
- `catalog[]=3026` — categoria Giochi
- `price_to=N` — prezzo massimo (per filtro N64)

## Aggiungere nuove console o titoli

Modifica `pages/index.js`:
- Array `CONSOLES` per le console
- Array `GAMES_BY_CONSOLE` per i giochi per console
- Array `N64_TITLES` per i titoli N64 specifici
- Array `COLLECTIBLES` per il collezionismo
