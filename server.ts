/**
 * Runtime ufficiale: Express serve API `/api/*` e, in produzione, i file statici in `dist/`.
 * `vercel.json` copre solo un deploy SPA statico (senza queste API) — vedi README.md.
 */
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
  findCourseBySlug,
  getDialogueAccessStatus,
  getPublicCourseCatalog,
  getReservedAreaOverview,
  recordDialogueInteraction,
  unlockDialogueTimePack,
  updateDispensaProgress,
} from './src/db/repository.ts';
import type { DialoguePackId } from './src/types/handoff.ts';
import {
  allowDirectUnlock,
  assertCheckoutPaid,
  checkoutLineItemFromCatalog,
  constructWebhookEvent,
  createCheckoutSession,
  isStripeConfigured,
} from './src/lib/stripe.ts';
import {
  courseStripePriceAnnotation,
  resolveBookingTariff,
} from './src/lib/paymentCatalog.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAFE_CLIENT_ERRORS = new Set([
  'Percorso didattico non trovato.',
  'Dispensa non trovata.',
  'Acquisto richiesto per accedere a questa dispensa.',
  'Tariffa consulto non valida.',
  'Pacchetto temporale non valido.',
  'Pagamento Stripe richiesto per attivare il percorso.',
  'Pagamento Stripe richiesto per attivare il pass.',
]);

function sendSafeError(
  res: express.Response,
  error: unknown,
  fallback: string,
  statusHints?: { notFound?: string; forbidden?: string; paymentRequired?: string }
) {
  const msg = error instanceof Error ? error.message : '';
  if (statusHints?.notFound && msg.includes(statusHints.notFound)) {
    return res.status(404).json({ error: msg });
  }
  if (statusHints?.forbidden && msg.includes(statusHints.forbidden)) {
    return res.status(403).json({ error: msg });
  }
  if (statusHints?.paymentRequired && msg.includes(statusHints.paymentRequired)) {
    return res.status(402).json({ error: msg });
  }
  if (SAFE_CLIENT_ERRORS.has(msg)) {
    const status = msg.includes('non trov') ? 404 : msg.includes('richiesto') ? 402 : 400;
    return res.status(status).json({ error: msg });
  }
  console.error(fallback, error);
  return res.status(500).json({ error: fallback });
}

function requestOrigin(req: express.Request, port: number): string {
  const originHeader =
    (typeof req.headers.origin === 'string' && req.headers.origin) ||
    process.env.APP_URL ||
    `http://localhost:${port}`;
  return originHeader.replace(/\/$/, '');
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function activateCourseFromPaidSession(params: {
  uid: string;
  email: string;
  displayName?: string | null;
  stripeSessionId: string;
  fallbackCourseSlug?: string;
  fallbackCustomerName?: string;
  fallbackCustomerPhone?: string;
}) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== 'course') {
    throw new Error('STRIPE_WRONG_ITEM_TYPE');
  }
  const courseSlug = String(meta.courseSlug || params.fallbackCourseSlug || '').trim();
  const customerName = String(
    meta.customerName || params.fallbackCustomerName || params.displayName || 'Corsista'
  ).trim();
  const customerPhone = meta.customerPhone
    ? String(meta.customerPhone).trim()
    : params.fallbackCustomerPhone;

  if (!courseSlug) {
    throw new Error('Metadati pagamento incompleti.');
  }

  return enrollUserInCourse({
    uid: params.uid,
    email: params.email,
    displayName: params.displayName,
    courseSlug,
    customerName,
    customerPhone,
    stripeSessionId: params.stripeSessionId,
  });
}

async function activateDialogueFromPaidSession(params: {
  stripeSessionId: string;
  fallbackSessionKey?: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== 'dialogue') {
    throw new Error('STRIPE_WRONG_ITEM_TYPE');
  }
  const packId = (meta.packId || '') as DialoguePackId;
  const sessionKey = String(meta.sessionKey || params.fallbackSessionKey || '').trim();
  const customerName = String(meta.customerName || 'Ospite Tarot Italia').trim();
  const customerEmail = String(
    meta.customerEmail || session.customer_email || ''
  ).trim();

  if (!sessionKey || !(packId in DIALOGUE_PACK_CATALOG)) {
    throw new Error('Metadati pagamento incompleti.');
  }

  return unlockDialogueTimePack({
    sessionKey,
    packId,
    customerName,
    customerEmail,
    stripeSessionId: params.stripeSessionId,
    uid: params.uid,
    authEmail: params.authEmail,
    authName: params.authName,
  });
}

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  // Stripe webhook needs the raw body for signature verification — mount before json().
  app.post(
    '/api/stripe/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      try {
        const event = constructWebhookEvent(
          req.body as Buffer,
          req.headers['stripe-signature'] as string | undefined
        );

        if (event.type === 'checkout.session.completed') {
          const sessionObj = event.data.object;
          if (sessionObj.payment_status === 'paid' && sessionObj.id) {
            const meta = sessionObj.metadata || {};
            const itemType = meta.itemType;

            if (itemType === 'dialogue') {
              const packId = meta.packId as DialoguePackId;
              const sessionKey = String(meta.sessionKey || '').trim();
              if (sessionKey && packId in DIALOGUE_PACK_CATALOG) {
                await unlockDialogueTimePack({
                  sessionKey,
                  packId,
                  customerName: String(meta.customerName || 'Ospite Tarot Italia'),
                  customerEmail: String(
                    meta.customerEmail || sessionObj.customer_email || ''
                  ),
                  stripeSessionId: sessionObj.id,
                  uid: meta.firebaseUserId || null,
                  authEmail:
                    meta.customerEmail || sessionObj.customer_email || null,
                  authName: meta.customerName || null,
                });
              } else {
                console.error('Webhook dialogue: metadata incompleti', meta);
              }
            } else if (itemType === 'course' && meta.firebaseUserId && meta.courseSlug) {
              await enrollUserInCourse({
                uid: String(meta.firebaseUserId),
                email: String(
                  meta.customerEmail || sessionObj.customer_email || ''
                ),
                displayName: meta.customerName || null,
                courseSlug: String(meta.courseSlug || ''),
                customerName: String(meta.customerName || 'Corsista'),
                customerPhone: meta.customerPhone
                  ? String(meta.customerPhone)
                  : undefined,
                stripeSessionId: sessionObj.id,
              });
            }
          }
        }

        res.json({ received: true });
      } catch (error) {
        console.error('Stripe webhook error:', error);
        const msg = error instanceof Error ? error.message : '';
        if (msg.startsWith('STRIPE_WEBHOOK_')) {
          return res.status(400).json({ error: 'Webhook non valido.' });
        }
        return res.status(500).json({ error: 'Errore elaborazione webhook.' });
      }
    }
  );

  app.use(express.json());

  // 1. Public Course & Dispense Outline Catalog
  app.get('/api/courses', async (_req, res) => {
    try {
      const catalog = await getPublicCourseCatalog();
      res.json({ courses: catalog });
    } catch (error) {
      sendSafeError(res, error, 'Errore nel caricamento dei percorsi didattici.');
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
      sendSafeError(res, error, 'Impossibile aprire l’Area Riservata.');
    }
  });

  /**
   * 3. Course enrollment gate
   * - With verified Stripe session → activate purchase
   * - With Stripe configured → create Checkout Session (no unlock yet)
   * - Non-prod + ALLOW_DIRECT_UNLOCK=true → explicit dev unlock
   * Never invents cs_reserved_… for production unlocks.
   */
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
        : '';

      if (!courseSlug || !customerName) {
        return res
          .status(400)
          .json({ error: 'Dati del percorso o nominativo mancanti.' });
      }

      const course = await findCourseBySlug(courseSlug);
      if (!course) {
        return res.status(404).json({ error: 'Percorso didattico non trovato.' });
      }

      // Path A: confirm an already-paid Checkout Session
      if (stripeSessionId) {
        const result = await activateCourseFromPaidSession({
          uid,
          email,
          displayName,
          stripeSessionId,
          fallbackCourseSlug: courseSlug,
          fallbackCustomerName: customerName,
          fallbackCustomerPhone: customerPhone,
        });
        return res.status(201).json({ mode: 'enrolled', ...result });
      }

      // Path B: start Stripe Checkout
      if (isStripeConfigured()) {
        const baseUrl = requestOrigin(req, PORT);
        const priceAnnotation =
          course.stripePriceId || courseStripePriceAnnotation(course.slug);
        const checkout = await createCheckoutSession({
          customerEmail: email,
          successUrl: `${baseUrl}/area-riservata?course_stripe_session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${baseUrl}/area-riservata?checkout=cancel&item=course`,
          lineItem: checkoutLineItemFromCatalog({
            stripePriceIdAnnotation: priceAnnotation,
            priceEur: course.priceEur,
            productName: `Tarot Italia · ${course.title}`,
            productDescription: course.subtitle,
          }),
          metadata: {
            itemType: 'course',
            courseSlug: course.slug,
            customerName,
            customerEmail: email,
            customerPhone: customerPhone || '',
            firebaseUserId: uid,
          },
        });

        return res.status(200).json({
          mode: 'stripe_redirect',
          checkoutUrl: checkout.url,
          stripeSessionId: checkout.id,
        });
      }

      // Path C: explicit non-prod preview only
      if (allowDirectUnlock()) {
        const result = await enrollUserInCourse({
          uid,
          email,
          displayName,
          courseSlug,
          customerName,
          customerPhone,
          stripeSessionId: `cs_dev_course_${course.slug}_${Date.now()}`,
        });
        return res.status(201).json({ mode: 'direct_unlock', ...result });
      }

      return res.status(503).json({
        error:
          'Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY (e i Price ID) oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true.',
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
        return res.status(402).json({
          error: 'Pagamento Stripe non ancora confermato.',
        });
      }
      if (msg === 'Metadati pagamento incompleti.' || msg === 'STRIPE_WRONG_ITEM_TYPE') {
        return res.status(400).json({ error: 'Metadati pagamento incompleti.' });
      }
      sendSafeError(res, error, 'Errore nella registrazione del percorso.', {
        notFound: 'non trovato',
      });
    }
  });

  // 3b. Confirm course Stripe session after redirect (also covered by webhook)
  app.post(
    '/api/reserved/confirm-stripe',
    requireAuth,
    async (req: AuthRequest, res) => {
      try {
        const uid = req.user?.uid;
        const email = req.user?.email || '';
        const displayName =
          typeof req.user?.name === 'string' ? req.user.name : null;
        const stripeSessionId = String(req.body?.stripeSessionId || '').trim();

        if (!uid || !email) {
          return res.status(401).json({ error: 'Autenticazione richiesta.' });
        }
        if (!stripeSessionId || !isStripeConfigured()) {
          return res.status(400).json({ error: 'Sessione Stripe non verificabile.' });
        }

        const result = await activateCourseFromPaidSession({
          uid,
          email,
          displayName,
          stripeSessionId,
        });
        res.json({ mode: 'enrolled', ...result });
      } catch (error) {
        const msg = error instanceof Error ? error.message : '';
        if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
          return res.status(402).json({
            error: 'Pagamento Stripe non ancora confermato.',
          });
        }
        sendSafeError(res, error, 'Errore nella verifica del pagamento corso.');
      }
    }
  );

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
        sendSafeError(res, error, 'Errore nel salvataggio del progresso.', {
          notFound: 'non trovata',
          forbidden: 'Acquisto richiesto',
        });
      }
    }
  );

  // 5. Consultation Bookings — price/duration from server catalog only
  app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const tariffId = String(req.body?.tariffId || '').trim();
      const tariff = resolveBookingTariff(tariffId);
      const scheduledDate = String(req.body?.scheduledDate || '').trim();
      const scheduledTime = String(req.body?.scheduledTime || '').trim();
      const fullName = String(req.body?.fullName || '').trim();
      const email = String(req.body?.email || '').trim();
      const phoneWhatsApp = String(req.body?.phoneWhatsApp || '').trim();
      const sessionIntent = String(req.body?.sessionIntent || '').trim();
      const deontologyAccepted = Boolean(req.body?.deontologyAccepted);

      if (
        !tariff ||
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
        tariffId: tariff.id,
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
      sendSafeError(res, error, 'Errore durante la registrazione della prenotazione.');
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
      sendSafeError(
        res,
        error,
        'Impossibile verificare il tempo residuo del dialogo.'
      );
    }
  });

  // 7. Dialogue Tarot: Authorize & Track Interaction
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
      sendSafeError(
        res,
        error,
        'Errore durante la verifica della sessione dialogo.'
      );
    }
  });

  /**
   * 8. Dialogue unlock — only after verified Stripe session, or explicit non-prod bypass.
   * Direct free unlock in production is not allowed.
   */
  app.post('/api/dialogue/unlock', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionKey = String(req.body?.sessionKey || '').trim();
      const packId = String(req.body?.packId || '').trim() as DialoguePackId;
      const customerName = String(req.body?.customerName || '').trim();
      const customerEmail = String(req.body?.customerEmail || '').trim();
      const stripeSessionId = req.body?.stripeSessionId
        ? String(req.body.stripeSessionId).trim()
        : '';

      if (
        !sessionKey ||
        sessionKey.length < 8 ||
        !(packId in DIALOGUE_PACK_CATALOG) ||
        customerName.length < 2 ||
        !isValidEmail(customerEmail)
      ) {
        return res.status(400).json({
          error: 'Inserisci nominativo, email valida e un pacchetto minuti valido.',
        });
      }

      if (stripeSessionId) {
        const result = await activateDialogueFromPaidSession({
          stripeSessionId,
          fallbackSessionKey: sessionKey,
          uid: req.user?.uid ?? null,
          authEmail: req.user?.email ?? null,
          authName: typeof req.user?.name === 'string' ? req.user.name : null,
        });
        return res.status(201).json(result);
      }

      if (allowDirectUnlock()) {
        const result = await unlockDialogueTimePack({
          sessionKey,
          packId,
          customerName,
          customerEmail,
          stripeSessionId: `cs_dev_dialogue_${packId}_${Date.now()}`,
          uid: req.user?.uid ?? null,
          authEmail: req.user?.email ?? null,
          authName: typeof req.user?.name === 'string' ? req.user.name : null,
        });
        return res.status(201).json({ mode: 'direct_unlock', ...result });
      }

      return res.status(402).json({
        error:
          'Pagamento Stripe richiesto. Usa /api/dialogue/checkout oppure conferma una sessione pagata.',
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
        return res.status(402).json({
          error: 'Pagamento Stripe non ancora confermato.',
        });
      }
      sendSafeError(res, error, 'Impossibile attivare il pass temporale.');
    }
  });

  // 9. Dialogue Tarot: Stripe Checkout (no silent free unlock in production)
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
        !isValidEmail(customerEmail)
      ) {
        return res.status(400).json({
          error:
            'Inserisci nominativo, email valida e un pacchetto minuti (5, 10 o 15 min).',
        });
      }

      const pack = DIALOGUE_PACK_CATALOG[packId];

      if (isStripeConfigured()) {
        const baseUrl = requestOrigin(req, PORT);
        const checkout = await createCheckoutSession({
          customerEmail,
          successUrl: `${baseUrl}/dialogo?dialogue_stripe_session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${baseUrl}/dialogo?checkout=cancel&item=dialogue`,
          lineItem: checkoutLineItemFromCatalog({
            stripePriceIdAnnotation: pack.stripePriceId,
            priceEur: pack.priceEur,
            productName: `Tarot Italia IA · ${pack.title}`,
            productDescription: `${pack.durationMinutes} minuti di dialogo guidato con Tarot Italia IA`,
          }),
          metadata: {
            itemType: 'dialogue',
            sessionKey,
            packId: pack.id,
            customerName,
            customerEmail,
            firebaseUserId: req.user?.uid || '',
          },
        });

        return res.status(200).json({
          mode: 'stripe_redirect',
          checkoutUrl: checkout.url,
          stripeSessionId: checkout.id,
        });
      }

      if (allowDirectUnlock()) {
        const unlocked = await unlockDialogueTimePack({
          sessionKey,
          packId,
          customerName,
          customerEmail,
          stripeSessionId: `cs_dev_dialogue_${packId}_${Date.now()}`,
          uid: req.user?.uid ?? null,
          authEmail: req.user?.email ?? null,
          authName: typeof req.user?.name === 'string' ? req.user.name : null,
        });

        return res.status(201).json({
          mode: 'direct_unlock',
          ...unlocked,
        });
      }

      return res.status(503).json({
        error:
          'Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true.',
      });
    } catch (error) {
      sendSafeError(res, error, 'Impossibile avviare il pagamento del pass.');
    }
  });

  // 10. Dialogue Tarot: confirm Stripe Checkout on return
  app.post('/api/dialogue/confirm-stripe', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const stripeSessionId = String(req.body?.stripeSessionId || '').trim();
      const fallbackSessionKey = String(req.body?.sessionKey || '').trim();

      if (!stripeSessionId || !isStripeConfigured()) {
        return res.status(400).json({ error: 'Sessione Stripe non verificabile.' });
      }

      const result = await activateDialogueFromPaidSession({
        stripeSessionId,
        fallbackSessionKey,
        uid: req.user?.uid ?? null,
        authEmail: req.user?.email ?? null,
        authName: typeof req.user?.name === 'string' ? req.user.name : null,
      });

      res.json(result);
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
        return res.status(402).json({
          error: 'Pagamento Stripe non ancora confermato.',
        });
      }
      if (msg === 'Metadati pagamento incompleti.' || msg === 'STRIPE_WRONG_ITEM_TYPE') {
        return res.status(400).json({ error: 'Metadati pagamento incompleti.' });
      }
      sendSafeError(res, error, 'Errore nella verifica del pagamento Stripe.');
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
