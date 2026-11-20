/**
 * Runtime locale / host Node: Express serve API `/api/*` e, in produzione, i file statici in `dist/`.
 * Su Vercel: `api/health.ts` + esbuild di `src/server/apiEntries/*` → `api/{courses,bookings,stripe,reserved,dialogue,news,chat}.js`.
 */
import express from 'express';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, type AuthRequest } from './src/middleware/auth.ts';
import {
  createComingSoonGate,
  resolveComingSoonHtmlPath,
} from './src/middleware/comingSoonGate.ts';
import { ensureBookingSchema } from './src/db/ensureBookingSchema.ts';
import { getCourses } from './src/server/routes/courses.ts';
import { getNewsArticles } from './src/server/routes/news.ts';
import { getChatStatus, postChatMessage } from './src/server/routes/chat.ts';
import {
  getComingSoonStatus,
  postComingSoonLock,
  postComingSoonUnlock,
  postComingSoonUnlockWithGoogle,
} from './src/server/routes/comingSoon.ts';
import {
  deleteUserNoteRoute,
  getReservedOverview,
  getUserNotes,
  postReservedConfirmStripe,
  postReservedEnroll,
  postUserNote,
  putDispensaProgress,
  putUserNote,
} from './src/server/routes/reserved.ts';
import {
  getBookingsAvailability,
  postBooking,
  postBookingConfirmStripe,
} from './src/server/routes/bookings.ts';
import {
  getDialogueStatus,
  postDialogueCheckout,
  postDialogueConfirmStripe,
  postDialogueInteract,
  postDialogueUnlock,
} from './src/server/routes/dialogue.ts';
import { postStripeWebhook } from './src/server/routes/stripeWebhook.ts';
import {
  bodyRecord,
  expressOrigin,
  sendResult,
  toApiUserFromAuth,
} from './src/server/expressAdapter.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  // Stripe webhook needs the raw body for signature verification — mount before json().
  app.post(
    '/api/stripe/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      sendResult(
        res,
        await postStripeWebhook({
          rawBody: req.body as Buffer,
          signatureHeader: req.headers['stripe-signature'] as
            | string
            | undefined,
        })
      );
    }
  );

  app.use(express.json());

  app.get('/api/coming-soon', async (req, res) => {
    const result = await getComingSoonStatus({
      host:
        (req.headers['x-forwarded-host'] as string | undefined) ||
        req.headers.host ||
        'localhost',
      cookieHeader: req.headers.cookie,
    });
    sendResult(res, result);
  });

  app.get('/api/coming-soon/status', async (req, res) => {
    const result = await getComingSoonStatus({
      host:
        (req.headers['x-forwarded-host'] as string | undefined) ||
        req.headers.host ||
        'localhost',
      cookieHeader: req.headers.cookie,
    });
    sendResult(res, result);
  });

  app.post('/api/coming-soon', async (req, res) => {
    const origin = expressOrigin(req, PORT);
    const idToken =
      typeof req.body?.idToken === 'string'
        ? req.body.idToken
        : typeof req.body?.id_token === 'string'
          ? req.body.id_token
          : '';
    const password =
      typeof req.body?.password === 'string' ? req.body.password : '';
    const result = idToken
      ? await postComingSoonUnlockWithGoogle({ idToken, origin })
      : await postComingSoonUnlock({ password, origin });
    if (result.setCookie) {
      res.setHeader('Set-Cookie', result.setCookie);
    }
    sendResult(res, { status: result.status, body: result.body });
  });

  app.post('/api/coming-soon/unlock', async (req, res) => {
    const origin = expressOrigin(req, PORT);
    const idToken =
      typeof req.body?.idToken === 'string'
        ? req.body.idToken
        : typeof req.body?.id_token === 'string'
          ? req.body.id_token
          : '';
    const password =
      typeof req.body?.password === 'string' ? req.body.password : '';
    const result = idToken
      ? await postComingSoonUnlockWithGoogle({ idToken, origin })
      : await postComingSoonUnlock({ password, origin });
    if (result.setCookie) {
      res.setHeader('Set-Cookie', result.setCookie);
    }
    sendResult(res, { status: result.status, body: result.body });
  });

  app.post('/api/coming-soon/lock', async (req, res) => {
    const result = postComingSoonLock({
      origin: expressOrigin(req, PORT),
    });
    if (result.setCookie) {
      res.setHeader('Set-Cookie', result.setCookie);
    }
    sendResult(res, { status: result.status, body: result.body });
  });

  app.get('/api/courses', async (_req, res) => {
    sendResult(res, await getCourses());
  });

  app.get('/api/news', async (_req, res) => {
    const result = await getNewsArticles();
    if (result.cacheControl) {
      res.setHeader('Cache-Control', result.cacheControl);
    }
    sendResult(res, { status: result.status, body: result.body });
  });

  app.get('/api/chat', async (_req, res) => {
    sendResult(res, getChatStatus());
  });

  app.post('/api/chat', async (req, res) => {
    sendResult(
      res,
      await postChatMessage({
        body: bodyRecord(req),
        authorization:
          typeof req.headers.authorization === 'string'
            ? req.headers.authorization
            : undefined,
      })
    );
  });

  app.get('/api/reserved/overview', requireAuth, async (req: AuthRequest, res) => {
    const user = toApiUserFromAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Identità utente non valida.' });
    }
    sendResult(res, await getReservedOverview(user));
  });

  app.post('/api/reserved/enroll', requireAuth, async (req: AuthRequest, res) => {
    const user = toApiUserFromAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Autenticazione richiesta.' });
    }
    sendResult(
      res,
      await postReservedEnroll({
        user,
        body: bodyRecord(req),
        origin: expressOrigin(req, PORT),
      })
    );
  });

  app.post(
    '/api/reserved/confirm-stripe',
    requireAuth,
    async (req: AuthRequest, res) => {
      const user = toApiUserFromAuth(req);
      if (!user) {
        return res.status(401).json({ error: 'Autenticazione richiesta.' });
      }
      sendResult(
        res,
        await postReservedConfirmStripe({
          user,
          body: bodyRecord(req),
        })
      );
    }
  );

  app.put(
    '/api/reserved/dispense/:dispensaId/progress',
    requireAuth,
    async (req: AuthRequest, res) => {
      const user = toApiUserFromAuth(req);
      if (!user) {
        return res.status(401).json({ error: 'Autenticazione richiesta.' });
      }
      sendResult(
        res,
        await putDispensaProgress({
          user,
          dispensaId: Number(req.params.dispensaId),
          body: bodyRecord(req),
        })
      );
    }
  );

  app.get('/api/reserved/notes', requireAuth, async (req: AuthRequest, res) => {
    const user = toApiUserFromAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Autenticazione richiesta.' });
    }
    res.setHeader('Cache-Control', 'private, no-store');
    sendResult(res, await getUserNotes(user));
  });

  app.post('/api/reserved/notes', requireAuth, async (req: AuthRequest, res) => {
    const user = toApiUserFromAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Autenticazione richiesta.' });
    }
    sendResult(
      res,
      await postUserNote({
        user,
        body: bodyRecord(req),
      })
    );
  });

  app.put(
    '/api/reserved/notes/:noteId',
    requireAuth,
    async (req: AuthRequest, res) => {
      const user = toApiUserFromAuth(req);
      if (!user) {
        return res.status(401).json({ error: 'Autenticazione richiesta.' });
      }
      sendResult(
        res,
        await putUserNote({
          user,
          noteId: Number(req.params.noteId),
          body: bodyRecord(req),
        })
      );
    }
  );

  app.delete(
    '/api/reserved/notes/:noteId',
    requireAuth,
    async (req: AuthRequest, res) => {
      const user = toApiUserFromAuth(req);
      if (!user) {
        return res.status(401).json({ error: 'Autenticazione richiesta.' });
      }
      sendResult(
        res,
        await deleteUserNoteRoute({
          user,
          noteId: Number(req.params.noteId),
        })
      );
    }
  );

  app.get('/api/bookings/availability', async (req, res) => {
    sendResult(
      res,
      await getBookingsAvailability({
        from: String(req.query?.from || '').trim(),
        to: String(req.query?.to || '').trim(),
      })
    );
  });

  app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res) => {
    sendResult(
      res,
      await postBooking({
        user: toApiUserFromAuth(req),
        body: bodyRecord(req),
        origin: expressOrigin(req, PORT),
      })
    );
  });

  app.post(
    '/api/bookings/confirm-stripe',
    optionalAuth,
    async (req: AuthRequest, res) => {
      sendResult(
        res,
        await postBookingConfirmStripe({
          user: toApiUserFromAuth(req),
          body: bodyRecord(req),
        })
      );
    }
  );

  app.get('/api/dialogue/status', optionalAuth, async (req: AuthRequest, res) => {
    sendResult(
      res,
      await getDialogueStatus({
        user: toApiUserFromAuth(req),
        sessionKey: String(req.query?.sessionKey || '').trim(),
      })
    );
  });

  app.post(
    '/api/dialogue/interact',
    optionalAuth,
    async (req: AuthRequest, res) => {
      sendResult(
        res,
        await postDialogueInteract({
          user: toApiUserFromAuth(req),
          body: bodyRecord(req),
        })
      );
    }
  );

  app.post(
    '/api/dialogue/unlock',
    optionalAuth,
    async (req: AuthRequest, res) => {
      sendResult(
        res,
        await postDialogueUnlock({
          user: toApiUserFromAuth(req),
          body: bodyRecord(req),
        })
      );
    }
  );

  app.post(
    '/api/dialogue/checkout',
    optionalAuth,
    async (req: AuthRequest, res) => {
      sendResult(
        res,
        await postDialogueCheckout({
          user: toApiUserFromAuth(req),
          body: bodyRecord(req),
          origin: expressOrigin(req, PORT),
        })
      );
    }
  );

  app.post(
    '/api/dialogue/confirm-stripe',
    optionalAuth,
    async (req: AuthRequest, res) => {
      sendResult(
        res,
        await postDialogueConfirmStripe({
          user: toApiUserFromAuth(req),
          body: bodyRecord(req),
        })
      );
    }
  );

  // Coming Soon gate before SPA/static (mirrors Vercel Edge middleware.ts)
  const comingSoonHtml = resolveComingSoonHtmlPath(__dirname);
  app.use(createComingSoonGate(comingSoonHtml));

  // Frontend Vite middleware (dev) or static dist (production / non-Vercel host)
  if (process.env.NODE_ENV !== 'production') {
    // Serve public/coming-soon.html and brand assets before Vite when gated.
    app.use(express.static(path.resolve(__dirname, 'public')));
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

  try {
    await ensureBookingSchema();
  } catch (error) {
    console.error('ensureBookingSchema failed (non-fatal at boot):', error);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Tarot Italia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
