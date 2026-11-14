import express from 'express';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, type AuthRequest } from './src/middleware/auth.ts';
import {
  createConsultationBooking,
  DIALOGUE_PACK_CATALOG,
  enrollUserInCourse,
  getDialogueAccessStatus,
  getPublicCourseCatalog,
  getReservedAreaOverview,
  recordDialogueInteraction,
  unlockDialogueTimePack,
  updateDispensaProgress,
} from './src/db/repository.ts';
import type { DialoguePackId } from './src/types/handoff.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // 1. Public Course & Dispense Outline Catalog
  app.get('/api/courses', async (_req, res) => {
    try {
      const catalog = await getPublicCourseCatalog();
      res.json({ courses: catalog });
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Errore nel caricamento dei percorsi didattici.',
      });
    }
  });

  // 2. Protected Reserved Area Overview (requires Firebase ID Token)
  app.get('/api/reserved/overview', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || '';
      const displayName =
        typeof req.user?.name === 'string' ? req.user.name : null;

      if (!uid) {
        return res.status(401).json({ error: 'Identità utente non valida.' });
      }

      const overview = await getReservedAreaOverview(uid, email, displayName);
      res.json(overview);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Impossibile aprire l’Area Riservata.',
      });
    }
  });

  // 3. Protected Course Enrollment / Purchase Registration
  app.post('/api/reserved/enroll', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || String(req.body?.email || '');
      const displayName =
        typeof req.user?.name === 'string' ? req.user.name : null;

      if (!uid || !email) {
        return res.status(401).json({ error: 'Autenticazione richiesta.' });
      }

      const courseSlug = String(req.body?.courseSlug || '').trim();
      const customerName = String(req.body?.customerName || displayName || '').trim();
      const customerPhone = req.body?.customerPhone
        ? String(req.body.customerPhone).trim()
        : undefined;
      const stripeSessionId = req.body?.stripeSessionId
        ? String(req.body.stripeSessionId).trim()
        : undefined;

      if (!courseSlug || !customerName) {
        return res
          .status(400)
          .json({ error: 'Dati del percorso o nominativo mancanti.' });
      }

      const result = await enrollUserInCourse({
        uid,
        email,
        displayName,
        courseSlug,
        customerName,
        customerPhone,
        stripeSessionId,
      });

      res.status(201).json(result);
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Errore nella registrazione del percorso.';
      res.status(msg.includes('non trovato') ? 404 : 500).json({ error: msg });
    }
  });

  // 4. Protected Study Progress & Personal Notes per Dispensa
  app.put(
    '/api/reserved/dispense/:dispensaId/progress',
    requireAuth,
    async (req: AuthRequest, res) => {
      try {
        const uid = req.user?.uid;
        const email = req.user?.email || '';
        const dispensaId = Number(req.params.dispensaId);

        if (!uid) {
          return res.status(401).json({ error: 'Autenticazione richiesta.' });
        }
        if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
          return res.status(400).json({ error: 'Identificativo dispensa non valido.' });
        }

        const completed =
          typeof req.body?.completed === 'boolean'
            ? req.body.completed
            : undefined;
        const personalNotes =
          typeof req.body?.personalNotes === 'string'
            ? req.body.personalNotes
            : undefined;

        const updated = await updateDispensaProgress({
          uid,
          email,
          dispensaId,
          completed,
          personalNotes,
        });

        res.json({ progress: updated });
      } catch (error) {
        const msg =
          error instanceof Error
            ? error.message
            : 'Errore nel salvataggio del progresso.';
        const statusCode = msg.includes('Acquisto richiesto')
          ? 403
          : msg.includes('non trovata')
            ? 404
            : 500;
        res.status(statusCode).json({ error: msg });
      }
    }
  );

  // 5. Consultation Bookings (supports logged-in users + guests)
  app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const tariffId = req.body?.tariffId;
      const durationMinutes = Number(req.body?.durationMinutes);
      const priceEur = Number(req.body?.priceEur);
      const scheduledDate = String(req.body?.scheduledDate || '').trim();
      const scheduledTime = String(req.body?.scheduledTime || '').trim();
      const fullName = String(req.body?.fullName || '').trim();
      const email = String(req.body?.email || '').trim();
      const phoneWhatsApp = String(req.body?.phoneWhatsApp || '').trim();
      const sessionIntent = String(req.body?.sessionIntent || '').trim();
      const deontologyAccepted = Boolean(req.body?.deontologyAccepted);

      if (
        (tariffId !== '45m' && tariffId !== '60m' && tariffId !== '90m') ||
        !scheduledDate ||
        !scheduledTime ||
        !fullName ||
        !email ||
        !phoneWhatsApp ||
        !deontologyAccepted
      ) {
        return res
          .status(400)
          .json({ error: 'Completa tutti i campi obbligatori della prenotazione.' });
      }

      const booking = await createConsultationBooking({
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        tariffId,
        durationMinutes,
        priceEur,
        scheduledDate,
        scheduledTime,
        fullName,
        email,
        phoneWhatsApp,
        sessionIntent,
        deontologyAccepted,
      });

      res.status(201).json({ booking });
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Errore durante la registrazione della prenotazione.',
      });
    }
  });

  // 6. Dialogue Tarot: 5-Minute Free Trial + Timed Paid Pass Status
  app.get('/api/dialogue/status', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionKey = String(req.query?.sessionKey || '').trim();
      if (!sessionKey || sessionKey.length < 8) {
        return res
          .status(400)
          .json({ error: 'Identificativo sessione dialogo mancante.' });
      }

      const status = await getDialogueAccessStatus({
        sessionKey,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      res.json({ status });
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Impossibile verificare il tempo residuo del dialogo.',
      });
    }
  });

  // 7. Dialogue Tarot: Authorize & Track Interaction (starts 5m trial on first action)
  app.post('/api/dialogue/interact', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionKey = String(req.body?.sessionKey || '').trim();
      if (!sessionKey || sessionKey.length < 8) {
        return res
          .status(400)
          .json({ error: 'Identificativo sessione dialogo mancante.' });
      }

      const result = await recordDialogueInteraction({
        sessionKey,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      if (!result.allowed) {
        return res.status(402).json({
          error:
            'I 5 minuti gratuiti di prova sono terminati. Sblocca un pass a tempo per proseguire il dialogo.',
          status: result.status,
        });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Errore durante la verifica della sessione dialogo.',
      });
    }
  });

  // 8. Dialogue Tarot: Unlock Prepaid Time Pass (5m / 10m / 15m)
  app.post('/api/dialogue/unlock', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionKey = String(req.body?.sessionKey || '').trim();
      const packId = String(req.body?.packId || '').trim() as DialoguePackId;
      const customerName = String(req.body?.customerName || '').trim();
      const customerEmail = String(req.body?.customerEmail || '').trim();

      if (
        !sessionKey ||
        sessionKey.length < 8 ||
        !(packId in DIALOGUE_PACK_CATALOG) ||
        customerName.length < 2 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
      ) {
        return res.status(400).json({
          error: 'Inserisci nominativo, email valida e un pacchetto minuti valido.',
        });
      }

      const result = await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName,
        customerEmail,
        stripeSessionId: req.body?.stripeSessionId
          ? String(req.body.stripeSessionId).trim()
          : undefined,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Impossibile attivare il pass temporale.',
      });
    }
  });

  // 9. Dialogue Tarot: Stripe Checkout Session (5m €3, 10m €5, 15m €7) con fallback diretto in assenza di STRIPE_SECRET_KEY
  app.post('/api/dialogue/checkout', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionKey = String(req.body?.sessionKey || '').trim();
      const packId = String(req.body?.packId || '').trim() as DialoguePackId;
      const customerName = String(req.body?.customerName || '').trim();
      const customerEmail = String(req.body?.customerEmail || '').trim();

      if (
        !sessionKey ||
        sessionKey.length < 8 ||
        !(packId in DIALOGUE_PACK_CATALOG) ||
        customerName.length < 2 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
      ) {
        return res.status(400).json({
          error: 'Inserisci nominativo, email valida e un pacchetto minuti (5, 10 o 15 min).',
        });
      }

      const pack = DIALOGUE_PACK_CATALOG[packId];
      const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();

      if (stripeKey && !stripeKey.startsWith('MY_')) {
        const originHeader =
          (typeof req.headers.origin === 'string' && req.headers.origin) ||
          process.env.APP_URL ||
          `http://localhost:${PORT}`;
        const baseUrl = originHeader.replace(/\/$/, '');

        const form = new URLSearchParams();
        form.set('mode', 'payment');
        form.set('customer_email', customerEmail);
        form.set('success_url', `${baseUrl}/?dialogue_stripe_session_id={CHECKOUT_SESSION_ID}`);
        form.set('cancel_url', `${baseUrl}/?dialogue_cancelled=true`);
        form.set('line_items[0][quantity]', '1');

        if (pack.stripePriceId.startsWith('price_')) {
          form.set('line_items[0][price]', pack.stripePriceId);
        } else {
          form.set('line_items[0][price_data][currency]', 'eur');
          form.set('line_items[0][price_data][unit_amount]', String(pack.priceEur * 100));
          form.set(
            'line_items[0][price_data][product_data][name]',
            `Tarot Italia IA · ${pack.title}`
          );
          form.set(
            'line_items[0][price_data][product_data][description]',
            `${pack.durationMinutes} minuti di dialogo guidato con Tarot Italia IA`
          );
        }

        form.set('metadata[sessionKey]', sessionKey);
        form.set('metadata[packId]', pack.id);
        form.set('metadata[customerName]', customerName);
        form.set('metadata[customerEmail]', customerEmail);

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: form.toString(),
        });

        const stripeData = (await stripeRes.json()) as {
          id?: string;
          url?: string;
          error?: { message?: string };
        };

        if (!stripeRes.ok || !stripeData.url) {
          throw new Error(
            stripeData.error?.message || 'Errore nella creazione della sessione Stripe.'
          );
        }

        return res.status(200).json({
          mode: 'stripe_redirect',
          checkoutUrl: stripeData.url,
          stripeSessionId: stripeData.id,
        });
      }

      // Preview / Pre-Stripe fallback: sblocca subito il pass su PostgreSQL
      const unlocked = await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName,
        customerEmail,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      return res.status(201).json({
        mode: 'direct_unlock',
        ...unlocked,
      });
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Impossibile avviare il pagamento del pass.',
      });
    }
  });

  // 10. Dialogue Tarot: Verifica sessione Stripe Checkout al rientro e accredita i minuti
  app.post('/api/dialogue/confirm-stripe', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const stripeSessionId = String(req.body?.stripeSessionId || '').trim();
      const fallbackSessionKey = String(req.body?.sessionKey || '').trim();
      const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();

      if (!stripeSessionId || !stripeKey || stripeKey.startsWith('MY_')) {
        return res.status(400).json({ error: 'Sessione Stripe non verificabile.' });
      }

      const verifyRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(stripeSessionId)}`,
        {
          headers: { Authorization: `Bearer ${stripeKey}` },
        }
      );
      const sessionObj = (await verifyRes.json()) as {
        payment_status?: string;
        customer_email?: string;
        metadata?: Record<string, string>;
        error?: { message?: string };
      };

      if (!verifyRes.ok || sessionObj.payment_status !== 'paid') {
        return res.status(402).json({
          error:
            sessionObj.error?.message || 'Pagamento Stripe non ancora confermato.',
        });
      }

      const meta = sessionObj.metadata || {};
      const packId = (meta.packId || '10m') as DialoguePackId;
      const sessionKey = meta.sessionKey || fallbackSessionKey;
      const customerName = meta.customerName || 'Ospite Tarot Italia';
      const customerEmail = meta.customerEmail || sessionObj.customer_email || '';

      if (!sessionKey || !(packId in DIALOGUE_PACK_CATALOG)) {
        return res.status(400).json({ error: 'Metadati pagamento incompleti.' });
      }

      const result = await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName,
        customerEmail,
        stripeSessionId,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : 'Errore nella verifica del pagamento Stripe.',
      });
    }
  });

  // Frontend Vite middleware (dev) or static dist (production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr:
          process.env.DISABLE_HMR === 'true'
            ? false
            : { server: httpServer },
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Tarot Italia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
