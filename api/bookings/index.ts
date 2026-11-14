import { postBooking } from '../../src/server/routes/bookings.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  readBodyObject,
  requestOrigin,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
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
