import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postReservedConfirmStripe } from '../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readBodyObject,
  requireUser,
  sendApiResult,
} from '../_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
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
