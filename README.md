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

- **Percorso ufficiale**: host Node che esegue `server.ts` (`npm start` dopo `npm run build`), tipicamente Cloud Run / AI Studio. Le API (`/api/reserved/*`, `/api/dialogue/*`, `/api/bookings`, `/api/bookings/availability`, `/api/stripe/webhook`, …) vivono lì.
- **`vercel.json`**: configurazione **solo SPA statica** (rewrite → `index.html`). Utile per un anteprima frontend senza backend; **non** monta Express né le route API. Non trattarlo come deploy completo del prodotto.

## Prenotazioni consulto (Zoho + Calendar)

Flusso allineato a `v2tarotitalia` (senza Supabase):

1. `GET /api/bookings/availability` → slot occupati (Postgres + opzionale Google FreeBusy).
2. `POST /api/bookings` → riserva `pending_payment` + redirect Stripe Checkout (`itemType=consultation`).
3. Webhook / `POST /api/bookings/confirm-stripe` → `confirmed` + email Zoho SMTP + evento Google Calendar.

Setup ops (Dashboard Zoho / Google / Stripe): Project Context `docs/zoho-booking.md`.

## Variabili d’ambiente

Vedi `.env.example`:

| Variabile | Uso |
|-----------|-----|
| `SQL_*` / `APP_URL` | Postgres e URL pubblico |
| `STRIPE_SECRET_KEY` | Checkout Session (corsi + dialogo + consulti) |
| `STRIPE_WEBHOOK_SECRET` | `POST /api/stripe/webhook` |
| `STRIPE_PRICE_ID_*` | Price ID Dashboard (opzionali; altrimenti `price_data`) |
| `ALLOW_DIRECT_UNLOCK=true` | Solo non-prod: sblocchi preview senza Stripe |
| `ZOHO_EMAIL` / `ZOHO_PASSWORD` | SMTP conferme prenotazione (App Password) |
| `GOOGLE_CALENDAR_*` / `GOOGLE_OAUTH_*` | Evento agenda + FreeBusy |

La config client Firebase è in `firebase-applet-config.json`. Dettagli: `docs/payments.md` e `docs/zoho-booking.md` nel Project Context.

## Path pubblici (Stripe return + legali)

| Path | Ruolo |
|------|--------|
| `/area-riservata` | Area corsi + success/cancel Stripe corsi |
| `/dialogo` | Dialogo Tarot + success/cancel Stripe pass |
| `/privacy` | Informativa privacy (SPA) |
| `/privacy.html` | Privacy statica HTML (Google OAuth) |
| `/termini-di-servizio` | Termini e Condizioni |
| `/disclaimer` | Disclaimer legale |

Contenuti legali: `src/data/legalContent.ts` (portati da v2tarotitalia).
