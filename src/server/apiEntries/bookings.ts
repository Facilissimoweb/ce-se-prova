/**
 * Bookings group: POST /api/bookings, confirm-stripe.
 * Availability lives in bookingAvailability.ts (firebase-free).
 * Subpaths via vercel.json rewrite → /api/bookings?__path=…
 * Bundled by scripts/bundle-api.mjs into api/bookings.js.
 *
 * Keep this free of vercelAdapter / firebase-admin: those static imports crash
 * the Vercel function as FUNCTION_INVOCATION_FAILED (plain text / 500 page),
 * which Prenota then surfaces as Unexpected token 'A'… is not valid JSON.
 * Guest WhatsApp booking (ENN-74) does not need Firebase Auth.
 */
import { ensureSchemaOnce } from '../../db/ensureBookingSchema.ts';
import {
  getBookingsAvailability,
  postBooking,
  postBookingConfirmStripe,
} from '../routes/bookings.ts';
import {
  queryString,
  readBodyObject,
  requestOrigin,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';
import { groupSubpath } from '../vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function methodNotAllowed(res: NodeLikeRes, allowed: string[]): void {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, {
    error: 'Metodo non consentito.',
    allow: allowed,
  });
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'bookings');

    // Fallback if rewrite to booking-availability is missing (local / old deploy).
    if (path === 'availability') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      await ensureSchemaOnce();
      const result = await getBookingsAvailability({
        from: queryString(req.query?.from),
        to: queryString(req.query?.to),
      });
      return sendJson(res, result.status, result.body);
    }

    if (!path) {
      // Browser GET looks like a “missing page”; always answer JSON with hints.
      if (method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return sendJson(res, 405, {
          error: 'Metodo non consentito.',
          allow: ['POST'],
          hint: 'Usa POST /api/bookings per creare una prenotazione (Invia prenotazione → WhatsApp). Per gli slot: GET /api/bookings/availability?from=YYYY-MM-DD&to=YYYY-MM-DD.',
        });
      }
      await ensureSchemaOnce();
      // Guest path — no firebase-admin. uid stays null until Auth is wired on a
      // separate light-safe entry.
      const result = await postBooking({
        user: null,
        body: readBodyObject(req),
        origin: requestOrigin(req),
      });
      return sendJson(res, result.status, result.body);
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      await ensureSchemaOnce();
      const result = await postBookingConfirmStripe({
        user: null,
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    return sendJson(res, 404, {
      error: 'Endpoint prenotazioni non trovato.',
      path,
      method,
      hint: 'POST /api/bookings oppure GET /api/bookings/availability?from=&to=',
    });
  } catch (error) {
    console.error('api/bookings handler failed:', error);
    return sendJson(res, 500, {
      error: 'Errore interno del server prenotazioni.',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
