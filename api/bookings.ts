/**
 * Bookings group: POST /api/bookings, availability, confirm-stripe.
 * Subpaths via vercel.json rewrite → /api/bookings?__path=…
 */
import {
  groupSubpath,
  sendJson,
  type EntryReq,
  type EntryRes,
} from '../src/server/vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: EntryReq, res: EntryRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'bookings');

    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();

    if (!path) {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postBooking } = await import('../src/server/routes/bookings.ts');
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postBooking({
          user,
          body: adapter.readBodyObject(req as never),
          origin: adapter.requestOrigin(req as never),
        })
      );
    }

    if (path === 'availability') {
      if (method !== 'GET') return adapter.methodNotAllowed(res as never, ['GET']);
      const { getBookingsAvailability } = await import(
        '../src/server/routes/bookings.ts'
      );
      return adapter.sendApiResult(
        res as never,
        await getBookingsAvailability({
          from: adapter.queryString(req.query?.from),
          to: adapter.queryString(req.query?.to),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postBookingConfirmStripe } = await import(
        '../src/server/routes/bookings.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postBookingConfirmStripe({
          user,
          body: adapter.readBodyObject(req as never),
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
