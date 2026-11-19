# Blog — articoli in-repo

Maria pubblica gli articoli **aggiungendo un file Markdown** in questa cartella e facendo deploy (commit / PR). Non serve Substack.

## Macro aree (ENN-84)

Ogni pezzo appartiene a **una** di queste categorie (`category` nel frontmatter):

| Valore frontmatter | Etichetta in UI |
|--------------------|-----------------|
| `Storia` | Storia |
| `Autori` | Autori |
| `A. Maggiori` | A. Maggiori |
| `A. Minori` | A. Minori |

I tag (`tags[]`) sono liberi (es. Rider-Waite-Smith, Golden Dawn) e filtrabili in lista.

## Nuovo articolo

1. Crea un file, es. `il-mio-titolo.md` (lo slug URL sarà `/news/il-mio-titolo`).
2. Frontmatter obbligatorio in cima:

```yaml
---
title: Titolo dell'articolo
date: 2026-11-18
description: Breve anteprima per elenco e SEO.
draft: false
category: Storia
tags:
  - Rider-Waite-Smith
  - Golden Dawn
---
```

Opzionale: `cover: /brand/mia-immagine.png` (path sotto `public/`).

### Articolo gated Maggiori (ENN-131 / ENN-132)

Per legare un pezzo al corso (Phase 1: unlock = acquisto Arcani Maggiori, non Stripe per articolo):

```yaml
gated: true
requiresCourse: arcani-maggiori
moduleLink: '01'
```

Nel corpo, marca il taglio pubblico / riservato con:

```markdown
Testo intro SEO (sempre visibile)…

<!-- gated -->

Approfondimento (solo corsisti Maggiori)…
```

Articolo Modulo 01 attuale: `/news/il-coraggio-di-iniziare-il-matto` (Il Matto).  
Lo slug promo ENN-131 `primo-settenario-mappa-identita` reindirizza al pezzo Matto.

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

In dettaglio: condivisione (WhatsApp, Telegram, Facebook, X), SEO/Open Graph/JSON-LD Article, CTA Prenota / Dialogo.
