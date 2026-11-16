/**
 * GET /api/bookings/availability — light entry (no firebase-admin).
 * Rewritten from /api/bookings/availability via vercel.json.
 * Bundled to api/booking-availability.js.
 *
 * Keep this free of vercelAdapter / firebase-admin: those imports crash the
 * Vercel function as FUNCTION_INVOCATION_FAILED (plain text), which Prenota
 * then surfaces as a JSON.parse error.
 */
import { getBookingsAvailability } from '../routes/bookings.ts';
import {
  queryString,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 15 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return sendJson(res, 405, { error: 'Metodo non consentito.' });
    }

    const result = await getBookingsAvailability({
      from: queryString(req.query?.from),
      to: queryString(req.query?.to),
    });
    return sendJson(res, result.status, result.body);
  } catch (error) {
    console.error('api/booking-availability handler failed:', error);
    // Always JSON — never let Vercel replace an uncaught throw with plain text
    // without also giving the client a parseable body when we can.
    return sendJson(res, 200, {
      occupied: [],
      degraded: true,
      notice:
        'Non riusciamo a verificare gli orari già prenotati in questo momento. Puoi comunque selezionare uno slot; la conferma avverrà via WhatsApp.',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
