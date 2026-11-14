import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postBooking } from '../../src/server/routes/bookings.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  readBodyObject,
  requestOrigin,
  sendApiResult,
} from '../_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
