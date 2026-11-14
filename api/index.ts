/**
 * Single Vercel Serverless Function for all /api/* routes (except /api/health).
 * Hobby plan ≤12 functions — keep related routes in one handler.
 * Static imports (like v2tarotitalia) so Vercel bundles src/ into the function.
 * Dynamic import() left .ts modules out of /var/task and caused runtime 500s.
 */
import {
  getBookingsAvailability,
  postBooking,
  postBookingConfirmStripe,
} from '../src/server/routes/bookings.ts';
import { getCourses } from '../src/server/routes/courses.ts';
import {
  getDialogueStatus,
  postDialogueCheckout,
  postDialogueConfirmStripe,
  postDialogueInteract,
  postDialogueUnlock,
} from '../src/server/routes/dialogue.ts';
import {
  getReservedOverview,
  postReservedConfirmStripe,
  postReservedEnroll,
  putDispensaProgress,
} from '../src/server/routes/reserved.ts';
import { postStripeWebhook } from '../src/server/routes/stripeWebhook.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  queryString,
  readBodyObject,
  readRawBody,
  requestOrigin,
  requireUser,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function sendJson(res: NodeLikeRes, status: number, body: unknown): void {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function normalizePath(req: NodeLikeReq): string {
  const fromQuery = req.query?.__path;
  if (typeof fromQuery === 'string' && fromQuery.trim()) {
    return fromQuery.replace(/^\/+|\/+$/g, '');
  }
  if (Array.isArray(fromQuery) && fromQuery[0]) {
    return String(fromQuery[0]).replace(/^\/+|\/+$/g, '');
  }

  const headerPath =
    (typeof req.headers?.['x-forwarded-uri'] === 'string'
      ? req.headers['x-forwarded-uri']
      : undefined) ||
    (typeof req.headers?.['x-invoke-path'] === 'string'
      ? req.headers['x-invoke-path']
      : undefined) ||
    (typeof req.headers?.['x-matched-path'] === 'string'
      ? req.headers['x-matched-path']
      : undefined);

  const candidates = [headerPath, req.url, ''];
  for (const raw of candidates) {
    if (!raw) continue;
    const pathname = String(raw).split('?')[0] || '';
    const cleaned = pathname
      .replace(/^\/?api\/?/, '')
      .replace(/^\/+|\/+$/g, '');
    if (cleaned && cleaned !== 'index') return cleaned;
  }
  return '';
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    await ensureSchemaOnce();

    const method = (req.method || 'GET').toUpperCase();
    const path = normalizePath(req);

    if (path === 'courses') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      return sendApiResult(res, await getCourses());
    }

    if (path === 'bookings') {
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

    if (path === 'bookings/availability') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      return sendApiResult(
        res,
        await getBookingsAvailability({
          from: queryString(req.query?.from),
          to: queryString(req.query?.to),
        })
      );
    }

    if (path === 'bookings/confirm-stripe') {
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

    if (path === 'reserved/overview') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(res, await getReservedOverview(user));
    }

    if (path === 'reserved/enroll') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedEnroll({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req),
        })
      );
    }

    if (path === 'reserved/confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedConfirmStripe({
          user,
          body: readBodyObject(req),
        })
      );
    }

    const dispensaProgress = path.match(
      /^reserved\/dispense\/([^/]+)\/progress$/
    );
    if (dispensaProgress) {
      if (method !== 'PUT') return methodNotAllowed(res, ['PUT']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await putDispensaProgress({
          user,
          dispensaId: Number(dispensaProgress[1]),
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/status') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await getDialogueStatus({
          user,
          sessionKey: queryString(req.query?.sessionKey),
        })
      );
    }

    if (path === 'dialogue/interact') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueInteract({
          user,
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/unlock') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueUnlock({
          user,
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/checkout') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueCheckout({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req),
        })
      );
    }

    if (path === 'dialogue/confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueConfirmStripe({
          user,
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'stripe/webhook') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const rawBody = await readRawBody(req);
      const signatureHeader =
        typeof req.headers['stripe-signature'] === 'string'
          ? req.headers['stripe-signature']
          : Array.isArray(req.headers['stripe-signature'])
            ? req.headers['stripe-signature'][0]
            : undefined;
      return sendApiResult(
        res,
        await postStripeWebhook({
          rawBody,
          signatureHeader,
        })
      );
    }

    return sendJson(res, 404, {
      error: 'Not found',
      path,
      method,
    });
  } catch (error) {
    console.error('api/index handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
