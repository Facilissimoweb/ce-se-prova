# Tarot Italia / Ennamo (`ce-se-prova`)

SPA React (Vite) + API: Firebase Auth, Postgres/Drizzle, contenuti editoriali in `src/data/`, Blog in `content/blog/`.

## Stack runtime

| Layer | Tecnologia |
|-------|------------|
| Auth | Firebase Auth (Google) + verifica ID token lato server |
| Dati | PostgreSQL + Drizzle (`src/db/*`) |
| UI | React 19 + Vite 8 + Tailwind 4 |
| API (locale) | Express in `server.ts` — stessi handler di Vercel |
| API (produzione consigliata) | **Vercel Serverless** — 10 funzioni: `api/health.ts` + esbuild `api/{courses,bookings,booking-availability,stripe,reserved,dialogue,news,chat,coming-soon}.js` da `src/server/apiEntries/*` (≤12 Hobby) |
| Coming Soon | Vercel Routing Middleware (`middleware.ts` + `@vercel/functions`) + `public/coming-soon.html` + `/api/coming-soon` (password → cookie httpOnly) |
| Pagamenti | Stripe Checkout + webhook / confirm-session |
| Prenotazioni | Zoho SMTP + Google Calendar (opzionali) |

Non si usa Supabase per Ennamo: stack Firebase + Postgres.

## Sviluppo e produzione locale

```bash
npm install
npm run dev      # Express + Vite middleware (API + HMR)
npm run build    # build frontend in dist/
npm start        # Express: API + file statici (host Node opzionale)
npm run lint     # tsc --noEmit
```

## Deploy su Vercel (percorso ufficiale)

1. Collega il repo a un progetto Vercel (framework Vite; `vercel.json` già presente).
2. Imposta le env in **Project Settings → Environment Variables** (vedi `.env.example`). Obbligatorie per API reali:
   - `DATABASE_URL` (Postgres TCP; non usare socket `/cloudsql/…`)
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `APP_URL` (URL pubblico, es. preview o `https://www.tarotitalia.com`)
   - Per Coming Soon su www: `COMING_SOON_ENABLED=true` + `COMING_SOON_PASSWORD` (o `COMING_SOON_PASSWORD_HASH`) — vedi doc ENN-92 nel Project Context
3. Deploy: SPA in `dist/` + **10** funzioni Serverless (`api/health.ts` + **committed** `api/{courses,bookings,booking-availability,stripe,reserved,dialogue,news,chat,coming-soon}.js` from `npm run build:api`). Vercel only discovers functions present in the repo `api/` tree — generated-only JS was 404. Refresh bundles with `npm run build:api` before commit when entries change. Sotto-path via rewrite `?__path=`. Hobby: max 12. SPA rewrite skips `/api`, `privacy.html`, `coming-soon.html`. Root `middleware.ts` (Node routing middleware via `@vercel/functions`) gates document routes when Coming Soon is on — not Next.js Edge/`@vercel/edge`. `GET /api/news` serves published posts from `content/blog/*.{md,mdx}` (compiled into `src/data/blogPosts.generated.ts`). `GET|POST /api/chat` is the generic FAB chat (Groq) when `TAROTITALIACHATGENERICAGROQ_API_KEY` is set (server-only).

### Blog (articoli in-repo)

1. Aggiungi `content/blog/mio-articolo.md` con frontmatter `title`, `date`, `description`, opzionale `cover` / `draft`.
2. `npm run build:blog` (anche incluso in `npm run build` / Vite) aggiorna `src/data/blogPosts.generated.ts`.
3. Commit + deploy Vercel. Dettaglio: `/news/mio-articolo`. Guida: `content/blog/README.md`.
4. Webhook Stripe: `https://<deployment>/api/stripe/webhook` (raw body; `bodyParser: false` on `api/stripe.js`).
5. Solo dopo smoke delle API: aggiungi il dominio custom (`www.tarotitalia.com`) — vedi docs cutover nel Project Context.

Express resta per `npm run dev` / host Node di emergenza; **non** serve un processo Express sempre acceso su Vercel.

## Variabili d’ambiente

Vedi `.env.example`. Sintesi:

| Variabile | Uso |
|-----------|-----|
| `DATABASE_URL` / `SQL_*` | Postgres (`DATABASE_URL` preferito su Vercel) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Admin SDK su Vercel |
| `APP_URL` | URL pubblico (success/cancel Stripe) |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Checkout + webhook |
| `STRIPE_PRICE_ID_*` | Price ID Dashboard (opzionali) |
| `ZOHO_*` / `GOOGLE_*` | Email e Calendar prenotazioni |
| `TAROTITALIACHATGENERICAGROQ_API_KEY` | Chat FAB generica via Groq (server-only; opzionale) |
| `GROQ_CHAT_MODEL` | Override modello chat (default `openai/gpt-oss-20b`) |
| `COMING_SOON_ENABLED=true` | Coming Soon gate (www di default) |
| `COMING_SOON_OWNER_EMAILS` | Extra Google owner emails (default includes `mariateresarogani@gmail.com`) |
| `COMING_SOON_UNLOCK_TOKEN` | Stringa random per link one-click `/admin/com?t=…` (opz.) |
| `COMING_SOON_PASSWORD` / `COMING_SOON_PASSWORD_HASH` | Password form (backup opzionale) |
| `COMING_SOON_SECRET_PATH` | Path extra (default `/preview-atelier`; must be a URL path, never an API key) |
| `COMING_SOON_ALL_HOSTS=true` | Gate anche su preview/localhost |
| `ALLOW_DIRECT_UNLOCK=true` | Solo non-prod |

La config client Firebase è in `firebase-applet-config.json`.
