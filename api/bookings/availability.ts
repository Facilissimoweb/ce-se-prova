import { getBookingsAvailability } from '../../src/server/routes/bookings.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  queryString,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  return sendApiResult(
    res,
    await getBookingsAvailability({
      from: queryString(req.query?.from),
      to: queryString(req.query?.to),
    })
  );
}
