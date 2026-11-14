/**
 * Single Vercel Serverless Function for all /api/* routes (except /api/health).
 * Hobby plan ≤12 functions — keep related routes in one handler.
 * Invoked via vercel.json rewrite: /api/:path* → /api
 */
import type { NodeLikeReq, NodeLikeRes } from '../src/server/nodeHttp.ts';

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
    const method = (req.method || 'GET').toUpperCase();
    const path = normalizePath(req);

    // Lazy-load shared server code so import failures return JSON instead of 500 FUNCTION_INVOCATION_FAILED.
    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();

    if (path === 'courses') {
      if (method !== 'GET') return adapter.methodNotAllowed(res, ['GET']);
      const { getCourses } = await import('../src/server/routes/courses.ts');
      return adapter.sendApiResult(res, await getCourses());
    }

    if (path === 'bookings') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postBooking } = await import('../src/server/routes/bookings.ts');
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postBooking({
          user,
          body: adapter.readBodyObject(req),
          origin: adapter.requestOrigin(req),
        })
      );
    }

    if (path === 'bookings/availability') {
      if (method !== 'GET') return adapter.methodNotAllowed(res, ['GET']);
      const { getBookingsAvailability } = await import(
        '../src/server/routes/bookings.ts'
      );
      return adapter.sendApiResult(
        res,
        await getBookingsAvailability({
          from: adapter.queryString(req.query?.from),
          to: adapter.queryString(req.query?.to),
        })
      );
    }

    if (path === 'bookings/confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postBookingConfirmStripe } = await import(
        '../src/server/routes/bookings.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postBookingConfirmStripe({
          user,
          body: adapter.readBodyObject(req),
        })
      );
    }

    if (path === 'reserved/overview') {
      if (method !== 'GET') return adapter.methodNotAllowed(res, ['GET']);
      const { getReservedOverview } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req, res);
      if (!user) return;
      return adapter.sendApiResult(res, await getReservedOverview(user));
    }

    if (path === 'reserved/enroll') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postReservedEnroll } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req, res);
      if (!user) return;
      return adapter.sendApiResult(
        res,
        await postReservedEnroll({
          user,
          body: adapter.readBodyObject(req),
          origin: adapter.requestOrigin(req),
        })
      );
    }

    if (path === 'reserved/confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postReservedConfirmStripe } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req, res);
      if (!user) return;
      return adapter.sendApiResult(
        res,
        await postReservedConfirmStripe({
          user,
          body: adapter.readBodyObject(req),
        })
      );
    }

    const dispensaProgress = path.match(
      /^reserved\/dispense\/([^/]+)\/progress$/
    );
    if (dispensaProgress) {
      if (method !== 'PUT') return adapter.methodNotAllowed(res, ['PUT']);
      const { putDispensaProgress } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req, res);
      if (!user) return;
      return adapter.sendApiResult(
        res,
        await putDispensaProgress({
          user,
          dispensaId: Number(dispensaProgress[1]),
          body: adapter.readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/status') {
      if (method !== 'GET') return adapter.methodNotAllowed(res, ['GET']);
      const { getDialogueStatus } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await getDialogueStatus({
          user,
          sessionKey: adapter.queryString(req.query?.sessionKey),
        })
      );
    }

    if (path === 'dialogue/interact') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postDialogueInteract } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postDialogueInteract({
          user,
          body: adapter.readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/unlock') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postDialogueUnlock } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postDialogueUnlock({
          user,
          body: adapter.readBodyObject(req),
        })
      );
    }

    if (path === 'dialogue/checkout') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postDialogueCheckout } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postDialogueCheckout({
          user,
          body: adapter.readBodyObject(req),
          origin: adapter.requestOrigin(req),
        })
      );
    }

    if (path === 'dialogue/confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postDialogueConfirmStripe } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req);
      return adapter.sendApiResult(
        res,
        await postDialogueConfirmStripe({
          user,
          body: adapter.readBodyObject(req),
        })
      );
    }

    if (path === 'stripe/webhook') {
      if (method !== 'POST') return adapter.methodNotAllowed(res, ['POST']);
      const { postStripeWebhook } = await import(
        '../src/server/routes/stripeWebhook.ts'
      );
      const rawBody = await adapter.readRawBody(req);
      const signatureHeader =
        typeof req.headers['stripe-signature'] === 'string'
          ? req.headers['stripe-signature']
          : Array.isArray(req.headers['stripe-signature'])
            ? req.headers['stripe-signature'][0]
            : undefined;
      return adapter.sendApiResult(
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
