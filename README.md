# Tarot Italia / Ennamo (`ce-se-prova`)

SPA React (Vite) + API Express: Firebase Auth, Postgres/Drizzle, contenuti editoriali in `src/data/`.

## Stack runtime

| Layer | Tecnologia |
|-------|------------|
| Auth | Firebase Auth (Google) + verifica ID token lato server (`src/middleware/auth.ts`) |
| Dati | PostgreSQL + Drizzle (`src/db/*`) |
| UI | React 19 + Vite 8 + Tailwind 4 |
| Server | Express in `server.ts` (API `/api/*` + static `dist/` in produzione) |

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

- **Percorso ufficiale**: host Node che esegue `server.ts` (`npm start` dopo `npm run build`), tipicamente Cloud Run / AI Studio. Le API (`/api/reserved/*`, `/api/dialogue/*`, `/api/bookings`, …) vivono lì.
- **`vercel.json`**: configurazione **solo SPA statica** (rewrite → `index.html`). Utile per un anteprima frontend senza backend; **non** monta Express né le route API. Non trattarlo come deploy completo del prodotto.

## Variabili d’ambiente

Vedi `.env.example` (`SQL_*`, `APP_URL`, opzionali Stripe per i pass dialogo). La config client Firebase è in `firebase-applet-config.json`.
