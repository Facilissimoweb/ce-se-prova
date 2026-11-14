import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBookingsAvailability } from '../../src/server/routes/bookings.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  queryString,
  sendApiResult,
} from '../_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  return sendApiResult(
    res,
    await getBookingsAvailability({
      from: queryString(req.query.from),
      to: queryString(req.query.to),
    })
  );
}
