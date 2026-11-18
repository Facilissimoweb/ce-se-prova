# Tarot Italia / Ennamo (`ce-se-prova`)

SPA React (Vite) + API: Firebase Auth, Postgres/Drizzle, contenuti editoriali in `src/data/`.

## Stack runtime

| Layer | Tecnologia |
|-------|------------|
| Auth | Firebase Auth (Google) + verifica ID token lato server |
| Dati | PostgreSQL + Drizzle (`src/db/*`) |
| UI | React 19 + Vite 8 + Tailwind 4 |
| API (locale) | Express in `server.ts` — stessi handler di Vercel |
| API (produzione consigliata) | **Vercel Serverless** — 8 funzioni: `api/health.ts` + esbuild `api/{courses,bookings,stripe,reserved,dialogue,news,chat}.js` da `src/server/apiEntries/*` (≤12 Hobby) |
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
3. Deploy: SPA in `dist/` + **8** funzioni Serverless (`api/health.ts` + **committed** `api/{courses,bookings,stripe,reserved,dialogue,news,chat}.js` from `npm run build:api`). Vercel only discovers functions present in the repo `api/` tree — generated-only JS was 404. Refresh bundles with `npm run build:api` before commit when entries change. Sotto-path via rewrite `?__path=`. Hobby: max 12. SPA rewrite skips `/api` and `privacy.html`. `GET /api/news` returns an empty Blog placeholder (Substack feed disconnected; new platform TBD). `GET|POST /api/chat` is the generic FAB chat (Groq) when `TAROTITALIACHATGENERICAGROQ_API_KEY` is set (server-only).
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
| `ALLOW_DIRECT_UNLOCK=true` | Solo non-prod |

La config client Firebase è in `firebase-applet-config.json`.
