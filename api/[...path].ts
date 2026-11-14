/**
 * Single Vercel Serverless Function for all /api/* routes.
 * Hobby plan allows ≤12 functions; one catch-all stays under that limit.
 */
import { getBookingsAvailability, postBooking, postBookingConfirmStripe } from '../src/server/routes/bookings.ts';
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
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function normalizePath(req: NodeLikeReq): string {
  const fromQuery = req.query?.path;
  if (Array.isArray(fromQuery) && fromQuery.length > 0) {
    return fromQuery.map(String).filter(Boolean).join('/');
  }
  if (typeof fromQuery === 'string' && fromQuery.trim()) {
    return fromQuery.replace(/^\/+|\/+$/g, '');
  }

  const rawUrl = String(req.url || '');
  const pathname = rawUrl.split('?')[0] || '';
  return pathname.replace(/^\/?api\/?/, '').replace(/^\/+|\/+$/g, '');
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();

  const method = (req.method || 'GET').toUpperCase();
  const path = normalizePath(req);

  if (path === 'health') {
    if (method !== 'GET') return methodNotAllowed(res, ['GET']);
    return sendJson(res, 200, { ok: true, service: 'ennamo' });
  }

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

  return sendJson(res, 404, { error: 'Not found' });
}
