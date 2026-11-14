import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, type AuthRequest } from './src/middleware/auth.ts';
import {
  createConsultationBooking,
  enrollUserInCourse,
  getPublicCourseCatalog,
  getReservedAreaOverview,
  updateDispensaProgress,
} from './src/db/repository.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
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

  // Frontend Vite middleware (dev) or static dist (production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tarot Italia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
