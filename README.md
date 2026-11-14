# Tarot Italia / Ennamo (`ce-se-prova`)

SPA React (Vite) + API Express: Firebase Auth, Postgres/Drizzle, contenuti editoriali in `src/data/`.

## Stack runtime

| Layer | Tecnologia |
|-------|------------|
| Auth | Firebase Auth (Google) + verifica ID token lato server (`src/middleware/auth.ts`) |
| Dati | PostgreSQL + Drizzle (`src/db/*`) |
| UI | React 19 + Vite 8 + Tailwind 4 |
| Server | Express in `server.ts` (API `/api/*` + static `dist/` in produzione) |
| Pagamenti | Stripe Checkout + webhook / confirm-session |

Non si usa Supabase: eventuali riferimenti storici nel copy sono stati allineati a questo stack.

## Sviluppo e produzione

```bash
npm install
npm run dev      # Express + Vite middleware (API + HMR)
npm run build    # build frontend in dist/
npm start        # Express produzione: API + file statici
npm run lint     # tsc --noEmit
```

## Deploy: Express vs `vercel.json`

- **Percorso ufficiale**: host Node che esegue `server.ts` (`npm start` dopo `npm run build`), tipicamente Cloud Run / AI Studio. Le API (`/api/reserved/*`, `/api/dialogue/*`, `/api/bookings`, `/api/stripe/webhook`, …) vivono lì.
- **`vercel.json`**: configurazione **solo SPA statica** (rewrite → `index.html`). Utile per un anteprima frontend senza backend; **non** monta Express né le route API. Non trattarlo come deploy completo del prodotto.

## Variabili d’ambiente

Vedi `.env.example`:

| Variabile | Uso |
|-----------|-----|
| `SQL_*` / `APP_URL` | Postgres e URL pubblico |
| `STRIPE_SECRET_KEY` | Checkout Session (corsi + dialogo) |
| `STRIPE_WEBHOOK_SECRET` | `POST /api/stripe/webhook` |
| `STRIPE_PRICE_ID_*` | Price ID Dashboard (opzionali; altrimenti `price_data`) |
| `ALLOW_DIRECT_UNLOCK=true` | Solo non-prod: sblocchi preview senza Stripe |

La config client Firebase è in `firebase-applet-config.json`. Dettagli operativi Stripe: store docs / `docs/payments.md` nel Project Context.
