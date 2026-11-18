# Blog — articoli in-repo

Maria pubblica gli articoli **aggiungendo un file Markdown** in questa cartella e facendo deploy (commit / PR). Non serve Substack.

## Nuovo articolo

1. Crea un file, es. `il-mio-titolo.md` (lo slug URL sarà `/news/il-mio-titolo`).
2. Frontmatter obbligatorio in cima:

```yaml
---
title: Titolo dell'articolo
date: 2026-11-18
description: Breve anteprima per elenco e SEO.
draft: false
---
```

Opzionale: `cover: /brand/mia-immagine.png` (path sotto `public/`).

3. Corpo in Markdown semplice (`##`, `###`, elenchi, `**grassetto**`, link `[testo](url)`).
4. Con `draft: true` l’articolo **non** compare sul sito né in `GET /api/news`.
5. In locale: `npm run build:blog` (anche automatico in `npm run build` / Vite). Poi commit di:
   - `content/blog/il-mio-titolo.md`
   - `src/data/blogPosts.generated.ts` (rigenerato)
   - `api/news.js` se hai lanciato `npm run build:api`
6. Dopo il merge su `main`, Vercel fa redeploy: il pezzo è live.

## Alias URL

Lista: `/news`, `/blog`, `/articoli`  
Dettaglio: `/news/<slug>` (stessi alias).
