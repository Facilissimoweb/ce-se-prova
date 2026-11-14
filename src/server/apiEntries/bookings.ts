/**
 * Bookings group: POST /api/bookings, availability, confirm-stripe.
 * Subpaths via vercel.json rewrite → /api/bookings?__path=…
 * Bundled by scripts/bundle-api.mjs into api/*.js for Vercel.
 */
import {
  getBookingsAvailability,
  postBooking,
  postBookingConfirmStripe,
} from '../routes/bookings.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  queryString,
  readBodyObject,
  requestOrigin,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../vercelAdapter.ts';
import { groupSubpath, sendJson } from '../vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'bookings');
    await ensureSchemaOnce();

    if (!path) {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postBooking({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req),
        })
      );
    }

    if (path === 'availability') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      return sendApiResult(
        res,
        await getBookingsAvailability({
          from: queryString(req.query?.from),
          to: queryString(req.query?.to),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postBookingConfirmStripe({
          user,
          body: readBodyObject(req),
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/bookings handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
